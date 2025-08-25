// import React from 'react'
// import Navbar from "../../components/Navbar/Navbar"

// const MyList = () => {
//   return (
//     <div className='main-div'>
//       <Navbar/>
//       <div className="mylist-cards">
//         <h1 className='heading'>My List</h1>
//       </div>
//     </div>
//   )
// }

// export default MyList
import React from "react";
import { useWatchlist } from "../../context/WatchlistContext";
import { Link } from "react-router-dom";

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No movies added yet. Go add some!</p>
      ) : (
        <ul>
          {watchlist.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "10px" }}>
              <Link to={`/details/${movie.id}`} style={{ marginRight: "10px" }}>
                {movie.title}
              </Link>
              <button onClick={() => removeFromWatchlist(movie.id)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchlistPage;

