import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApidata] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE2MzAzYjhiOGYwZTZjZjFlNjA1NTM1OGRhNTFhZCIsIm5iZiI6MTc1NTkwNTA2NC4zMTUsInN1YiI6IjY4YThmYzI4ZTFiZGRjMGVhZjFlNDVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqa7FDJpuyj2S5_-BYloBhYLrz2NH1X7istZc1E6qmk",
    },
  };
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "upcoming"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApidata(res.results))
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  console.log(apiData)
  return (
    
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/details/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original` + card.poster_path}  
                alt=""
              />
              {/* <p>{card.original_title}</p> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
