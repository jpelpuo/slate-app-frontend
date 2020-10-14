import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const MainContainer = styled(Container)`
    padding: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    // height: 100%;
    justify-content: center;
    align-items: center;
`;

const IndexLayout = ({ children }) => {
    return (
        <MainContainer fluid>
            <Content>
                {children}
            </Content>
        </MainContainer>
    );
}

export default IndexLayout;