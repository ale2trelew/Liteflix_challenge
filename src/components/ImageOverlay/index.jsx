import React from "react";
import {
  Container,
  Image,
  Overlay,
  ChildrenContainer,
} from "./styles/imageOverlay";

export const ImageOverlay = ({
  children,
  imgSrc,
  bgColor,
  width,
  height,
  fSize,
  fColor,
}) => {
  return (
    <Container style={{ width: width, height: height }}>
      <Image src={imgSrc} alt="Avatar" />
      <Overlay style={{ backgroundColor: bgColor }}>
        <ChildrenContainer style={{ fontSize: fSize, color: fColor }}>
          {children}
        </ChildrenContainer>
      </Overlay>
    </Container>
  );
};

export default ImageOverlay;
