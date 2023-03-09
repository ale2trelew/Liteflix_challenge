import React from 'react';
import { LogoSpan, ParagraphContainer } from './styles/logo';

const Logo = ({ margin }) => (
    <ParagraphContainer style={{ margin: margin ?? "0 0 0 35px" }}>
        Lite<LogoSpan>Flix</LogoSpan>
    </ParagraphContainer>
);

export default Logo;
