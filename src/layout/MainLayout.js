import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import withAuth from '../components/hoc/withAuth';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const MainContainer = styled(Container)`
    padding: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    padding-top: 3rem;
    box-sizing: border-box;
    flex-direction: row;
`;

const MainContent = styled.div`
    display: flex;
    width: ${props => props.role === 'admin' ? "80%" : "100%"};;
    flex-direction: column;
    margin-left: ${props => props.role === 'admin' ? "15%" : ""};
    margin-top: 3rem;
    align-items: center;
    height: 100%;
    padding-bottom: 1rem;
    box-sizing: border-box;
`;

const MainLayout = ({ children, role }) => {
    return (
        <MainContainer fluid>
            <NavBar />
            <Content className="">
                {
                    role === 'admin' && <SideNav />
                }
                <MainContent role={role} className="">
                    {children}
                </MainContent>
            </Content>
        </MainContainer>
    );
}

const select = state => {
    return {
        role: state.user.role
    }
}

MainLayout.propTypes = {
    children: PropTypes.array.isRequired,
    role: PropTypes.string.isRequired
}

export default connect(select, null)(withAuth(MainLayout));