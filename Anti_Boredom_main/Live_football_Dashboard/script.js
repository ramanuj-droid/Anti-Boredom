// Frontend-only realtime using BroadcastChannel + localStorage persistence
(() => {
  const BC_CHANNEL = "anti-boredom-live";
  const bc =
    "BroadcastChannel" in window ? new BroadcastChannel(BC_CHANNEL) : null;
  const clientId =
    localStorage.getItem("ab_client") ||
    "u_" + Math.random().toString(36).slice(2, 9);
  localStorage.setItem("ab_client", clientId);
  document.getElementById("clientId").textContent = clientId;

  const matchKey = "ab_match_demo_v1";

  const samplePlayers = [
    { id: "p1", name: "A. Silva", pos: "FW" },
    { id: "p2", name: "B. Gomez", pos: "MF" },
    { id: "p3", name: "C. Ivanov", pos: "DF" },
    { id: "p4", name: "D. Koulibaly", pos: "GK" },
  ];

  function loadState() {
    const raw = localStorage.getItem(matchKey);
    if (!raw)
      return {
        predictions: { home: 0, draw: 0, away: 0, scorers: {} },
        ratings: {},
        posts: [],
      };
    try {
      return JSON.parse(raw);
    } catch (e) {
      return {
        predictions: { home: 0, draw: 0, away: 0, scorers: {} },
        ratings: {},
        posts: [],
      };
    }
  }
  function saveState(s, skipBroadcast) {
    localStorage.setItem(matchKey, JSON.stringify(s));
    if (!skipBroadcast && bc) {
      bc.postMessage({ t: "state_update", from: clientId, payload: s });
    }
  }

  let state = loadState();

  const notifyWrap = document.getElementById("notifyWrap");
  function notify(text, ttl = 4000) {
    const d = document.createElement("div");
    d.className = "toast";
    d.textContent = text;
    notifyWrap.prepend(d);
    setTimeout(() => {
      d.style.opacity = 0;
      d.style.transform = "translateX(8px)";
      setTimeout(() => d.remove(), 300);
    }, ttl);
  }

  function broadcast(type, data) {
    if (bc) bc.postMessage({ t: type, from: clientId, payload: data });
    try {
      localStorage.setItem(
        "ab_event",
        JSON.stringify({
          t: type,
          at: Date.now(),
          from: clientId,
          payload: data,
        })
      );
    } catch (e) {}
  }

  if (bc) {
    bc.addEventListener("message", (ev) => {
      handleRemote(ev.data);
    });
  }
  window.addEventListener("storage", (ev) => {
    if (ev.key === "ab_event" && ev.newValue) {
      try {
        const e = JSON.parse(ev.newValue);
        if (e.from !== clientId) handleRemote(e);
      } catch (e) {}
    }
  });

  function handleRemote(msg) {
    if (!msg || msg.from === clientId) return;
    if (msg.t === "prediction" || msg.t === "scorer" || msg.t === "goal") {
      state = loadState();
      renderPredictions();
      if (msg.t === "goal") notify("GOAL: " + msg.payload.player + " scored!");
    }
    if (msg.t === "rating") {
      state = loadState();
      renderPlayers();
      notify("Rating updated for " + msg.payload.playerName);
    }
    if (msg.t === "post") {
      state = loadState();
      renderDiscussion();
      notify("New post: " + (msg.payload.text || ""));
    }
    if (msg.t === "state_update") {
      state = msg.payload;
      renderAll();
    }
  }

  // Predictions UI
  document.querySelectorAll("[data-pred]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const p = btn.getAttribute("data-pred");
      state.predictions[p] = (state.predictions[p] || 0) + 1;
      saveState(state);
      broadcast("prediction", { pred: p });
      renderPredictions();
      notify("Prediction recorded: " + p);
    })
  );
  document.getElementById("scorerBtn").addEventListener("click", () => {
    const input = document.getElementById("scorerInput");
    const name = input.value && input.value.trim();
    if (!name) return;
    state.predictions.scorers[name] =
      (state.predictions.scorers[name] || 0) + 1;
    saveState(state);
    broadcast("scorer", { player: name });
    renderPredictions();
    input.value = "";
    notify("Scorer predicted: " + name);
  });

  function renderPredictions() {
    const el = document.getElementById("predStats");
    el.innerHTML = "";
    const p = state.predictions || { home: 0, draw: 0, away: 0, scorers: {} };
    const container = document.createElement("div");
    container.innerHTML = `<div class="small">Outcome — home: ${
      p.home || 0
    } &nbsp; draw: ${p.draw || 0} &nbsp; away: ${p.away || 0}</div>`;
    const scList = Object.entries(p.scorers || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
    const scorers = document.createElement("div");
    scorers.style.marginTop = "8px";
    scorers.innerHTML = '<div class="small">Top scorer predictions:</div>';
    scList.forEach(([name, c]) => {
      const d = document.createElement("div");
      d.className = "small";
      d.textContent = `${name} — ${c}`;
      scorers.appendChild(d);
    });
    el.appendChild(container);
    el.appendChild(scorers);
  }

  // Ratings
  function ensureRatings() {
    samplePlayers.forEach((p) => {
      if (!state.ratings[p.id])
        state.ratings[p.id] = { total: 0, count: 0, by: {} };
    });
  }
  ensureRatings();

  function renderPlayers() {
    ensureRatings();
    const wrapper = document.getElementById("playersList");
    wrapper.innerHTML = "";
    samplePlayers.forEach((p) => {
      const s = state.ratings[p.id] || { total: 0, count: 0 };
      const avg = s.count ? (s.total / s.count).toFixed(2) : "—";
      const div = document.createElement("div");
      div.className = "player";
      div.innerHTML = `<div class="meta"><div class="name">${
        p.name
      } <span class="small">(${
        p.pos
      })</span></div><div class="small">Avg: <strong>${avg}</strong> • ${
        s.count || 0
      } ratings</div></div><div class="stars" data-player="${p.id}"></div>`;
      wrapper.appendChild(div);
      const starsEl = div.querySelector(".stars");
      for (let i = 1; i <= 5; i++) {
        const sp = document.createElement("span");
        sp.className = "star";
        sp.innerHTML = "★";
        sp.dataset.val = i;
        if (s.by && s.by[clientId] && s.by[clientId] >= i)
          sp.classList.add("active");
        sp.addEventListener("click", () => {
          submitRating(p.id, p.name, i);
        });
        starsEl.appendChild(sp);
      }
    });
  }

  function submitRating(playerId, playerName, value) {
    const r = state.ratings[playerId] || { total: 0, count: 0, by: {} };
    const prev = r.by[clientId] || 0;
    r.by[clientId] = value;
    r.total = r.total - prev + value;
    if (prev === 0) r.count = (r.count || 0) + 1;
    state.ratings[playerId] = r;
    saveState(state);
    broadcast("rating", { playerId, playerName, value });
    renderPlayers();
    notify(`You rated ${playerName} ${value}★`);
  }

  // Discussion
  function renderDiscussion() {
    const list = document.getElementById("discussionList");
    list.innerHTML = "";
    (state.posts || [])
      .slice()
      .reverse()
      .forEach((p) => {
        const el = document.createElement("div");
        el.className = "post";
        el.innerHTML = `<div style="display:flex;justify-content:space-between"><div><strong>${
          p.author
        }</strong> <span class="small muted">${new Date(
          p.ts
        ).toLocaleTimeString()}</span></div><div class="small">${
          p.score ? p.score + "★" : ""
        }</div></div><div style="margin-top:8px">${escapeHtml(
          p.text
        )}</div><div style="margin-top:8px"><button class="secondary reply-btn" data-id="${
          p.id
        }">Reply</button></div>`;
        list.appendChild(el);
        if (p.replies)
          p.replies.forEach((r) => {
            const re = document.createElement("div");
            re.className = "post reply";
            re.innerHTML = `<div><strong>${
              r.author
            }</strong> <span class="small muted">${new Date(
              r.ts
            ).toLocaleTimeString()}</span></div><div style="margin-top:6px">${escapeHtml(
              r.text
            )}</div>`;
            list.appendChild(re);
          });
      });
    list.querySelectorAll(".reply-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const txt = prompt("Reply:");
        if (txt && txt.trim()) {
          addReply(id, txt.trim());
        }
      })
    );
  }

  function addPost(text) {
    const post = {
      id: "post_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      author: clientId,
      ts: Date.now(),
      text,
      replies: [],
    };
    state.posts = state.posts || [];
    state.posts.push(post);
    saveState(state);
    broadcast("post", post);
    renderDiscussion();
    notify("Posted: " + text.slice(0, 40));
  }
  function addReply(postId, text) {
    const post = (state.posts || []).find((p) => p.id === postId);
    if (!post) return;
    post.replies = post.replies || [];
    post.replies.push({
      id: "r_" + Date.now(),
      author: clientId,
      ts: Date.now(),
      text,
    });
    saveState(state);
    broadcast("post", { replyTo: postId, text });
    renderDiscussion();
    notify("Reply posted");
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  document.getElementById("postBtn").addEventListener("click", () => {
    const t = document.getElementById("postText").value.trim();
    if (!t) return;
    addPost(t);
    document.getElementById("postText").value = "";
  });
  document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("postText").value = "";
  });

  document.getElementById("simulateGoal").addEventListener("click", () => {
    const player =
      samplePlayers[Math.floor(Math.random() * samplePlayers.length)];
    const pName = player.name;
    broadcast("goal", { player: pName, ts: Date.now() });
    notify("Simulated GOAL by " + pName);
  });

  function renderAll() {
    renderPredictions();
    renderPlayers();
    renderDiscussion();
  }
  renderAll();

  saveState(state, true);

  if (bc) {
    bc.addEventListener("message", (ev) => {
      const d = ev.data;
      if (d.from === clientId) return;
      if (d.t === "goal") notify("GOAL: " + d.payload.player);
    });
  }

  // expose some functions for testing from console
  window._ab = { state, saveState, loadState };
})();
