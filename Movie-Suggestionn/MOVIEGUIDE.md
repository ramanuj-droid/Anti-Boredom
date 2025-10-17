***🎬 MovieGuide.md***
***🧩 Overview***

This Streamlit app displays the IMDb Top 250 Movies using data fetched from the RapidAPI IMDb API.
It allows users to explore, filter, and sort movies interactively in a clean and simple interface.

***⚙️ How It Works***

The app sends a request to the IMDb API to fetch the top 250 movies.

The received data is converted into a Pandas DataFrame.

Unwanted genres (like Animation, Documentary, etc.) are automatically removed.

Users can:

- ***Filter movies by genre or minimum IMDb rating***
- ***Sort results by rating, year, or title***
- ***Download the filtered movie list as a CSV file***

***🚀 How to Run Locally***

***Install dependencies***

pip install -r requirements.txt

***Run the app***

streamlit run main.py

***Open the local Streamlit URL in your browser (usually http://localhost:8501)***

***🧠 Features***

- ***Clean UI built with Streamlit***
- ***Real-time filtering & sorting***
- ***CSV export option***
- ***Automatically excludes unwanted genres***
- ***Easy to modify and extend***
