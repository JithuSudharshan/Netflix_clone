import React, { createContext, useState, useContext } from "react";
import App from "../App"

const WatchlistContext = createContext();

export const WatchlistProvider = () => {
  const [watchlist, setWatchlist] = useState([]);

  
  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
     <App/>
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
