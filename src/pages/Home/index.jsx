import React, { useState, useEffect } from "react";
import { Spinner, useToast } from "@chakra-ui/react"
import { Container, HeroContainer} from './styles/home';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import SideMovies from '../../components/SideMovies';

const Home = ({ popularMovie, setPopularMovie, setMyMovies, myMovies }) => {
  const [topMovie, setTopMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const getTopMovie = async () => {
    setIsLoading(true);

    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20';

    try {
      const res = await fetch(url);
      const { results } = await res.json();
      const randomMovie = results.sort(() => 0.5 - Math.random()).slice(0, 1);

      setTopMovie(randomMovie[0]);
      setIsLoading(false);
    } catch (e) {
      toast({
        title: 'Ups! Something went wrong.',
        description: 'Please try again',
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'left-accent',
      });

      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopMovie();
  }, []);

  const getBackgroundStyle = () => {
    const urlImage = `https://image.tmdb.org/t/p/original/${topMovie?.poster_path}`;

    return topMovie?.poster_path
      ? {
          backgroundImage: `linear-gradient(to bottom, rgb(11 11 11 / 60%), rgb(13 13 13 / 1%)), url(${urlImage})`,
        }
      : { background: '#000' };
  };

  if (isLoading) return <Spinner size='xl' />;

  return (
    <Container style={getBackgroundStyle()}>
      <Navbar myMovies={myMovies} />
      <HeroContainer>
        <Hero title={topMovie?.original_title} />
        <SideMovies popularMovie={popularMovie} setPopularMovie={setPopularMovie} myMovies={myMovies} />
      </HeroContainer>
    </Container>
  );
};

export default Home;
