const countdownEl = document.getElementById("countdown");
const statusEl = document.getElementById("mission-status");
const rocket = document.querySelector(".rocket");
const flame = document.querySelector(".flame");
const launchBtn = document.getElementById("launch-btn");

launchBtn.addEventListener("click", () => {
    let countdown = 10;
    statusEl.textContent = "Ignition sequence started";
    flame.style.opacity = 1;

    const interval = setInterval(() => {
        countdownEl.textContent = countdown;
        countdown--;

        if (countdown < 0) {
            clearInterval(interval);
            statusEl.textContent = "Liftoff!";
            rocketLaunchAnimation();
        }
    }, 1000);
});

function rocketLaunchAnimation() {
    rocket.style.transition = "bottom 5s linear";
    rocket.style.bottom = "500px";  // liftoff height
    statusEl.textContent = "Rocket is in flight!";
    setTimeout(() => {
        statusEl.textContent = "Stage separation complete!";
        flame.style.background = "red";
    }, 3000);
}
