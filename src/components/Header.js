import React from 'react';
import styled from 'styled-components';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HeaderContainer = styled(Jumbotron)`
    padding: 1.4rem;
    border-radius: 0.2rem;
    width: 100%;
`;

const HeaderText = styled.h2`
    color: gray;
    font-weight: bolder;
    text-align: left;
`;

const Header = ({ icon, headerText }) => {
    return (
        <HeaderContainer fluid>
            <HeaderText>
                {icon} <span>{headerText}</span>
            </HeaderText>
        </HeaderContainer>
    );
}

Header.propTypes = {
    icon: PropTypes.object.isRequired,
    headerText: PropTypes.string.isRequired
}

export default Header;