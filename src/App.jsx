import React, { useState, useEffect } from 'react';

import Home from './pages/Home';

const App = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    const storageMovie = JSON.parse(localStorage.getItem('OwnMovies')) ?? [];

    setMyMovies([storageMovie]);
  }, []);

  return (
    <Home
      popularMovie={popularMovie}
      setPopularMovie={setPopularMovie}
      myMovies={myMovies}
      setMyMovies={setMyMovies}
    />
  );
};

export default App;
