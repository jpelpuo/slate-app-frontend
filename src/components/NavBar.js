import React from 'react';
import styled from 'styled-components';
import { Navbar, Nav, Button } from 'react-bootstrap';
import slate from '../images/slate.png';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FaHome, FaGraduationCap, FaEdit, FaChartBar, FaUser } from 'react-icons/fa';
import { logout } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TopNav = styled(Navbar)`
    background-color: #000000 !important;
    color: #ffffff !important;

    a.active{
        color: orange;
    }
`;

const StyledNavLink = styled(NavLink)`
    color: gray;
    margin: auto 0.8rem;

    &:hover{
        color: orange;
        text-decoration: none;
    }

    @media screen and (max-width: 990px){
        margin: 1rem !important;
    }
`;

const NavText = styled.span`
    margin-left: 0.2rem;
    vertical-align: middle;
`;

const NavButton = styled(Button)`
    color: white;
    background-color: red !important;
    border-color: red !important;

    &:hover{
        background-color: orange !important;
        border-color: orange !important;
    }
`;


const NavBar = ({ logout, role, firstName, lastName }) => {

    const handleSignout = () => {
        logout();
    }
    return (
        <TopNav collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/home">
                <img src={slate} alt="Slate logo" width="150" height="40" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {
                    role === 'user'
                        ? <Nav className="mr-auto">
                            <StyledNavLink to='/user/home'>
                                <FaHome />
                                <NavText>
                                    Home
                                </NavText>
                            </StyledNavLink>
                            <StyledNavLink to='/user/courses'>
                                <FaGraduationCap />
                                <NavText >
                                    Courses
                                </NavText>
                            </StyledNavLink>
                            <StyledNavLink to='/user/exams'>
                                <FaEdit />
                                <NavText>
                                    Exams
                                </NavText>
                            </StyledNavLink>
                            <StyledNavLink to='/user/ranking'>
                                <FaChartBar />
                                <NavText>
                                    Ranking
                                </NavText>
                            </StyledNavLink>
                        </Nav>
                        :
                        <Nav className="mr-auto">
                            <StyledNavLink to="/admin/home">
                                <NavText>
                                    Admin Dashboard
                                </NavText>
                            </StyledNavLink>
                        </Nav>
                }
                <Nav>
                    <StyledNavLink to='/user/profile'>
                        <FaUser />
                        <NavText>
                            Hi! {role === 'user' ? `${firstName} ${lastName}` : "Admin"}
                        </NavText>
                    </StyledNavLink>
                    <NavButton onClick={handleSignout}>
                        <FaSignOutAlt />
                        <NavText>
                            Sign out
                        </NavText>
                    </NavButton>
                </Nav>
            </Navbar.Collapse>

        </TopNav>
    );
}

const select = state => {
    return {
        role: state.user.role,
        firstName: state.user.firstName,
        lastName: state.user.lastName
    }
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string
}

export default connect(select, { logout })(NavBar);
