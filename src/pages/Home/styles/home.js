import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  min-height: 100vh;

  @media (min-width: 768px) {
    background-size: cover;
    min-height: 100vh;
    background-position: 50% 15%;
    animation: focus 2s ease-out;
    -webkit-animation: focus 2s ease-out;
  }

  @keyframes focus {
    0% {
      transform: scale(1.2);
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
      -ms-transform: scale(1.2);
      -o-transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
    }
  }
`;

export const HeroContainer = styled.main`
  width: 100%;
  margin: 50px auto 0px;

  @media (min-width: 768px) {
    margin: 0 25px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 2rem;
  }
`;
