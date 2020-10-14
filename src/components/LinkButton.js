import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinkButton = styled(Link)`
    width: 40%;
    background: transparent;
    border-radius: 0.9rem;
    border: 1px solid white;
    text-decoration: none;
    color: inherit;
    padding: 0.375rem 0.75rem;

    &:hover{
        text-decoration: none;
        color: inherit;
    }
`;

const LinkButton = ({ children, to }) => {
    return (
        <StyledLinkButton to={to}>
            {children}
        </StyledLinkButton>
    );
}

export default LinkButton;