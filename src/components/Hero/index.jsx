import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import { BsPlay, BsPlus } from 'react-icons/bs';

import { ButtonsContainer, Container, MainTitle, MainTitleContainer, SubTitle } from './styles/hero';
import Button from '../Button';

const Hero = ({ title }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Container>
      <SubTitle>
        <span style={{ fontWeight: '600' }}>Original de</span> Liteflix
      </SubTitle>
      <MainTitleContainer>
        <MainTitle>{title}</MainTitle>
      </MainTitleContainer>
      <ButtonsContainer>
        <Button
          title='Reproducir'
          Icon={BsPlay}
          background='#242424'
          _hover={{ background: 'rgba(36, 36, 36, 0.5)' }}
        />
        <Button
          title='Mi lista'
          Icon={BsPlus}
          background='rgba(36, 36, 36, 0.5)'
          border='1px solid rgba(255, 255, 255, 0.5)'
          marginLeft={!isMobile && '24px'}
          marginTop={isMobile && '10px'}
          _hover={{ background: '#242424' }}
        />
      </ButtonsContainer>
    </Container>
  );
};

export default Hero;
