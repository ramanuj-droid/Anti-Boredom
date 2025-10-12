import { useState, useEffect } from "react";
import axios from "axios";

const RandomMeme = () => {
  const [meme, setMeme] = useState({ title: "", url: "" });
  const [loading, setLoading] = useState(false);

  const fetchMeme = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://meme-api.com/gimme");
      setMeme({ title: res.data.title, url: res.data.url });
    } catch (err) {
      setMeme({ title: "Failed to fetch meme 😢", url: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
      {loading && <p>Loading meme...</p>}
      {meme.url && !loading && (
        <img
          src={meme.url}
          alt={meme.title}
          style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
        />
      )}
      <p>{meme.title}</p>
      <button
        onClick={fetchMeme}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#007BFF",
          color: "#fff",
          border: "none",
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get New Meme"}
      </button>
    </div>
  );
};

export default RandomMeme;
