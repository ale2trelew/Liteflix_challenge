import React from "react";
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ Icon, title, background, border, ...rest }) => (
    <ChakraButton 
        leftIcon={Icon && <Icon size='26px'/>}
        width='248px'
        height='56px'
        borderRadius='none'
        background={background}
        fontSize='18px'
        lineHeight='21.6px'
        letterSpacing='4px'
        fontWeight='normal'
        border={border ?? ''}
        {...rest}
    >
        {title}
    </ChakraButton>
);

export default Button;
