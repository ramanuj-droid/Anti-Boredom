import os
import json
import requests
from flask import Flask, jsonify, send_from_directory, request

app = Flask(__name__, static_folder="static", static_url_path="/static")

# Set your Jamendo API Client ID (or leave empty to use local fallback)
JAMENDO_CLIENT_ID = os.environ.get("JAMENDO_CLIENT_ID", "")
GENRES = ["pop", "electronic", "rock", "hiphop", "classical"]
FALLBACK_FILE = "songs.json"

def load_local_tracks():
    """Load fallback songs from local JSON file."""
    with open(FALLBACK_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    grouped = {g: [t for t in data if t.get("genre") == g] for g in GENRES}
    return grouped

def fetch_jamendo_trending(limit_per_genre=5):
    """Fetch trending tracks from Jamendo API."""
    if not JAMENDO_CLIENT_ID:
        return None
    grouped = {}
    for genre in GENRES:
        url = "https://api.jamendo.com/v3.0/tracks"
        params = {
            "client_id": JAMENDO_CLIENT_ID,
            "format": "json",
            "limit": limit_per_genre,
            "fuzzytext": genre,
            "order": "popularity_total",
            "audioformat": "mp31"
        }
        try:
            res = requests.get(url, params=params, timeout=6)
            res.raise_for_status()
            results = res.json().get("results", [])
            tracks = []
            for r in results:
                tracks.append({
                    "id": f"jam_{r.get('id')}",
                    "title": r.get("name"),
                    "artist": r.get("artist_name"),
                    "genre": genre,
                    "stream_url": r.get("audio") or r.get("audiodownload"),
                    "cover": r.get("album_image") or "",
                    "source": "jamendo"
                })
            grouped[genre] = tracks
        except Exception as e:
            print(f"[Error fetching {genre}]: {e}")
            return None
    return grouped

@app.route("/api/trending")
def get_trending():
    """Return trending songs grouped by genre."""
    source = request.args.get("source", "auto")
    if source == "local" or not JAMENDO_CLIENT_ID:
        return jsonify(load_local_tracks())
    api_data = fetch_jamendo_trending()
    if api_data:
        return jsonify(api_data)
    return jsonify(load_local_tracks())

@app.route("/")
def index():
    """Serve static frontend if exists."""
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static(path):
    """Serve other static files."""
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
