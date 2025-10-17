import streamlit as st
import pandas as pd
import requests


# --- IMDb API details ---
url = "https://imdb236.p.rapidapi.com/api/imdb/top250-movies"
headers = {
    "x-rapidapi-key": "",  # replace with your valid key
    "x-rapidapi-host": "imdb236.p.rapidapi.com"
}

# --- Streamlit UI ---
st.set_page_config(page_title="🎬 IMDb Top 250", layout="wide")
st.title("🎬 IMDb Top 250 Movies")

# Fetch data
with st.spinner("Fetching movie data..."):
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()

        # Handle if the response is a list or dict
        if isinstance(data, list):
            movies = data
        elif isinstance(data, dict):
            movies = data.get("titles") or data.get("results") or list(data.values())[0]
        else:
            st.error("Unexpected API format.")
            st.stop()

        df = pd.DataFrame(movies)
    else:
        st.error(f"Failed to fetch data: {response.status_code}")
        st.stop()

# --- Clean up columns ---
rename_map = {
    "title": "Movie Title",
    "imDbRating": "Rating",
    "genres": "Genres",
    "year": "Year"
}
df.rename(columns={k: v for k, v in rename_map.items() if k in df.columns}, inplace=True)

# Convert Rating to numeric
if "Rating" in df.columns:
    df["Rating"] = pd.to_numeric(df["Rating"], errors="coerce")

# --- Normalize genres ---
if "Genres" in df.columns:
    df["Genres"] = df["Genres"].apply(
        lambda g: ", ".join(g) if isinstance(g, list) else str(g)
    )

# --- Sidebar filters ---
st.sidebar.header("🔍 Filter Options")

# Unwanted genres to exclude
unwanted_genres = {
    "Animation", "Short", "Documentary", "Talk-Show", "Music", "Musical", 
    "News", "Reality-TV", "Game-Show"
}

if "Genres" in df.columns:
    # Extract all genres, filter out unwanted ones
    all_genres = sorted({
        genre.strip()
        for g in df["Genres"].dropna()
        for genre in str(g).split(",")
        if genre.strip() not in unwanted_genres
    })
    selected_genres = st.sidebar.multiselect("Select Genres", all_genres)
else:
    selected_genres = []

min_rating = st.sidebar.slider("Minimum Rating", 0.0, 10.0, 0.0, 0.1)

# --- Apply filters ---
filtered_df = df.copy()

if selected_genres and "Genres" in filtered_df.columns:
    filtered_df = filtered_df[filtered_df["Genres"].apply(lambda g: any(sg in str(g) for sg in selected_genres))]

if "Rating" in filtered_df.columns:
    filtered_df = filtered_df[filtered_df["Rating"] >= min_rating]

# --- Sorting ---
available_sort_columns = [col for col in ["Rating", "Movie Title", "Year"] if col in filtered_df.columns]

if available_sort_columns:
    sort_by = st.sidebar.selectbox("Sort By", available_sort_columns, index=0)
    sort_order = st.sidebar.radio("Sort Order", ["Descending", "Ascending"])
    
    if sort_by in filtered_df.columns:
        filtered_df = filtered_df.sort_values(by=sort_by, ascending=(sort_order == "Ascending"))
else:
    sort_by = None
    st.sidebar.warning("⚠️ No sortable columns available.")

# --- Display results ---
st.write(f"### Showing {len(filtered_df)} Movies")
st.dataframe(filtered_df, use_container_width=True)

# --- CSV download ---
csv = filtered_df.to_csv(index=False).encode("utf-8")
st.download_button(
    label="⬇️ Download Filtered Data as CSV",
    data=csv,
    file_name="imdb_top_movies_filtered.csv",
    mime="text/csv",
)
