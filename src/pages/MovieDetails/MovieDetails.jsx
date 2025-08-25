import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import logo from "../../assets/logo.png";
import play_icon from "../../assets/play_icon.png";
import myList_icon from "../../assets/Mylist_icon.png";
import imdb_icon from "../../assets/imdb_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import Navbar from "../../components/Navbar/Navbar";
import {  useWatchlist} from "../../context/WatchlistContext";
import minus_icon from "../../assets/minus_icon.png"

const MovieDetails = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({});
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE2MzAzYjhiOGYwZTZjZjFlNjA1NTM1OGRhNTFhZCIsIm5iZiI6MTc1NTkwNTA2NC4zMTUsInN1YiI6IjY4YThmYzI4ZTFiZGRjMGVhZjFlNDVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqa7FDJpuyj2S5_-BYloBhYLrz2NH1X7istZc1E6qmk",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res))
      .catch((err) => console.error(err));
  }, [id]);
  const isInWatchlist = watchlist.some((m) => m.id === apiData.id);
  return (
    <div className="movie-cointainer">
      <Navbar />
      <div
        className="back-button"
        onClick={() => navigate(-1, { replace: true })}
      >
        <img src={back_arrow_icon} alt="" />
      </div>
      <div className="back-drop">
        <img
          src={`https://image.tmdb.org/t/p/original` + apiData.backdrop_path}
          alt=""
        />
      </div>
      <div className="movie-details">
        <img src={logo} alt="" />
        <h1>{apiData.title}</h1>
        <p>{apiData.overview}</p>
        <div className="banner-btns">
          <Link to={`/player/${id}`} style={{ textDecoration: "none" }}>
            <button className="btn">
              <img src={play_icon} alt="" />
              Play
            </button>
          </Link>

          {isInWatchlist ? (
            <button
              className="btn dark-btn"
              onClick={() => removeFromWatchlist(apiData.id)}
            >
              <img src={minus_icon} alt="" />
              Remove from List
            </button>
          ) : (
            <button
              className="btn dark-btn"
              onClick={() => addToWatchlist(apiData)}
            >
              <img src={myList_icon} alt="" />
              Add to My List
            </button>
          )}
        </div>
        <h4>Realease Date : {apiData.release_date}</h4>
        <div className="rating">
          <h4>
            Rating : {(Math.floor(apiData.vote_average * 10) / 10).toFixed(1)} /
            10{" "}
          </h4>
          <img src={imdb_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
