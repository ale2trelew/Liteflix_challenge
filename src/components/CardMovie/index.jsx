import React from 'react';
import dayjs from 'dayjs';
import { Icon, useMediaQuery } from '@chakra-ui/react';
import { VscPlayCircle } from 'react-icons/vsc';
import { IoStarSharp } from 'react-icons/io5';

import {
  Container,
  DetailsHeader,
  HoverContainer,
  PlayBtnContainer,
  TitleContainer,
  DetailsTitle,
  DetailsFooter,
  RangeValoration,
  ReleaseDate,
} from './styles/cardMovie';
import ImageOverlay from '../ImageOverlay';

const CardMovie = ({ movie, categoryId, defaultCategoryId }) => {
  const { backdrop_path, original_title, vote_average, release_date } = movie;
  const [isMobile] = useMediaQuery('(min-width: 768px)');

  const HoverDetails = () => (
    <>
      <DetailsHeader>
        <Icon as={VscPlayCircle} height='26px' width='26px' />
        <DetailsTitle>{original_title}</DetailsTitle>
      </DetailsHeader>
      <DetailsFooter>
        {vote_average && (
          <>
            <Icon as={IoStarSharp} height='14px' width='14px' color='#64EEBC' />
            <RangeValoration>{vote_average.toString().replace('.', ',')}</RangeValoration>
          </>
        )}
        {release_date && <ReleaseDate>{dayjs(release_date).format('YYYY')}</ReleaseDate>}
      </DetailsFooter>
    </>
  );

  return (
    <Container>
      <ImageOverlay
        imgSrc={
          categoryId === defaultCategoryId
            ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
            : `${backdrop_path}`
        }
        bgColor='rgba(36, 36, 36, 0.7)'
        width={isMobile ? '220px' : '350px'}
        height={isMobile ? '123px' : '199px'}
      >
        <HoverDetails />
      </ImageOverlay>
      <HoverContainer>
        <PlayBtnContainer>
          <Icon as={VscPlayCircle} width={isMobile ? '40px' : '48px'} height={isMobile ? '40px' : '48px'} />
        </PlayBtnContainer>
        <TitleContainer>{original_title}</TitleContainer>
      </HoverContainer>
    </Container>
  );
};

export default CardMovie;
