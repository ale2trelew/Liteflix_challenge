import React, { useState, useEffect } from 'react';
import { Select, Spinner, Text } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

import { Container, SelectContainer } from './styles/sidemovies';
import CardMovie from '../CardMovie';

const SideMovies = ({ popularMovie, setPopularMovie, myMovies }) => {
  const defaultCategoryId = 1;

  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = [
    { id: 1, name: 'Populares' },
    { id: 2, name: 'Mis películas' },
  ];

  const getPopularMovies = async () => {
    setIsLoading(true);

    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20';

    if (categoryId === defaultCategoryId) {
      const res = await fetch(url);
      const { results } = await res?.json();
      const sortedMovies = results.sort(() => 0.5 - Math.random()).slice(0, 4);

      setPopularMovie(sortedMovies);
    } else {
      setPopularMovie(myMovies);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPopularMovies();
  }, [categoryId]);

  const SelectCategory = () => (
    <SelectContainer>
      <Text fontSize='20px' paddingRight='10px'>
        Ver:
      </Text>
      <Select
        icon={<FiChevronDown />}
        variant='unstyled'
        fontSize='20px'
        transform='uppercase'
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        {categoryOptions.map((c) => (
          <option style={{ background: '#242424', border: 'none' }} key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>
    </SelectContainer>
  );

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <SelectCategory />
      {categoryId === defaultCategoryId ? (
        <>
          {popularMovie?.map((movie, idx) => (
            <CardMovie
              key={idx}
              movie={movie}
              categoryId={categoryId}
              defaultCategoryId={defaultCategoryId}
            />
          ))}
        </>
      ) : (
        myMovies.length > 0 && (
          <>
            {myMovies?.map((movie, idx) => (
              <CardMovie
                key={idx}
                movie={movie}
                categoryId={categoryId}
                defaultCategoryId={defaultCategoryId}
              />
            ))}
          </>
        )
      )}
    </Container>
  );
};

export default SideMovies;
