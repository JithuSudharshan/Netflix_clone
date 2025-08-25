import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const[playerData,setPlayerData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })
  console.log(playerData.type)
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE2MzAzYjhiOGYwZTZjZjFlNjA1NTM1OGRhNTFhZCIsIm5iZiI6MTc1NTkwNTA2NC4zMTUsInN1YiI6IjY4YThmYzI4ZTFiZGRjMGVhZjFlNDVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqa7FDJpuyj2S5_-BYloBhYLrz2NH1X7istZc1E6qmk'
  }
};
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setPlayerData(res.results[0]))
  .catch(err => console.error(err));
},[])
  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={()=>navigate(-1)} />
      <iframe
        src={`https://www.youtube.com/embed/${playerData.key}`}
        width="90%"
        height="90%"
        frameBorder="0"
        title="Trailer"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{playerData.published_at.slice(0,10)}</p>
        <p>{playerData.name}</p>
        <p>{playerData.type}</p>
      </div>
    </div>
  );
};

export default Player;
