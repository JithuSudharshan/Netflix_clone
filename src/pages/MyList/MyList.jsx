import { useEffect } from "react";
import "../MyList/Mylist.css";
import { useWatchlist } from "../../context/WatchlistContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import trash_icon from "../../assets/trash_icon.svg";
import eighteen_plus_icon from "../../assets/eighteen_plus_icon2.png";
import twelve_plus_icon from "../../assets/twelve_plus_icon.png";

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <div className="main-div">
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="main-heading">
        <h1>My Watchlist</h1>
      </div>
      <div className="body-div">
        {watchlist.length > 0 ? (
          watchlist.map((cards) => (
            <div className="list-cards" key={cards.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${cards.poster_path}`}
                alt={cards.title}
                className="card-img"
              />
              <h3>{cards.title}</h3>
              {cards.adult === true ? (
                <img src={eighteen_plus_icon} alt="18+" className="adult-div" />
              ) : (
                <img src={twelve_plus_icon} alt="12+" className="adult-div" />
              )}
              <img
                onClick={() => removeFromWatchlist(cards.id)}
                className="trash_icon"
                src={trash_icon}
                alt="Remove"
              />
            </div>
          ))
        ) : (
          <p>No movies added yet. Go add some!</p>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
