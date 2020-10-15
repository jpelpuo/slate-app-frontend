import React from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNav } from '../redux/actions/appActions';
import { FaHome, FaGraduationCap, FaEdit, FaCaretDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const SideNavContainer = styled.div`
    width: 15%;
    height: 100%;
    border-right: 1px solid lightgray;
    position: fixed;
    left: 0;
    display: flex;
    padding-top: 2.6rem;
    background-color: white;    
`;

const StyledNav = styled(Nav)`
    width: 100%;

    a.active {
        color: white;
        border-right: 4px solid black;
        background-color: darkorange;
    }
`;

const StyledNavLink = styled(NavLink)`
    width: 100%;
    text-align: left;
    text-decoration: none;
    padding: 0.9rem;
    color: gray;
    transition: all 0.2s;

    &:hover{
        text-decoration: none;
        color: black;
        background-color: white;
        border-right: 4px solid black;
    }
`;

const DropdownNav = styled.div`
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
    transition: all 0.2s;
    background-color: lightgray;
`;

const NavButton = styled.div`
    width: 100%;
    text-align: left;
    background-color: inherit;
    border: none;
    outline: none;
    color: gray;
    padding: 1rem;
    transition: all 0.2s;
    cursor: pointer;

    &:hover{
        background-color: white;
        color: black;
    }

    & + ${DropdownNav}{
        height: ${props => (props.navButtonClicked && props.Id === props.navId) ? "6.6rem" : "0px"};
    }
`;

const NavText = styled.span`
    vertical-align: -2px;
`;


const SideNav = ({ navButtonClicked, toggleNav, navId, navOpen }) => {
    const handleToggleNav = (id) => {
        if (id !== navId) {
            toggleNav({
                navButtonClicked: true,
                navId: id
            })
            return;
        }

        toggleNav({
            navButtonClicked: !navButtonClicked,
            navId: id
        })
    }

    return (
        <SideNavContainer>
            <StyledNav className="flex-column">
                <StyledNavLink to="/admin/home" className="">
                    <FaHome />
                    <NavText className="ml-1" style={{ verticalAlign: "-2px" }}>
                        Home
                    </NavText>
                </StyledNavLink>
                <NavButton
                    onClick={(e) => handleToggleNav('course')}
                    Id="course"
                    navButtonClicked={navButtonClicked}
                    navId={navId}
                    navOpen={navOpen}
                >
                    <FaGraduationCap />
                    <NavText className="ml-1" style={{ verticalAlign: "-2px" }}>
                        Course
                    </NavText>
                    <span className="float-right">
                        <FaCaretDown />
                    </span>
                </NavButton>
                <DropdownNav className="" navId="course" >
                    <StyledNavLink to="/admin/courses">
                        <span className="pl-3">
                            All Courses
                        </span>
                    </StyledNavLink>
                    <StyledNavLink to="/admin/add/course">
                        <span className="pl-3">
                            Add Course
                        </span>
                    </StyledNavLink>
                </DropdownNav>
                <NavButton
                    onClick={(e) => handleToggleNav('exams')}
                    Id="exams"
                    navButtonClicked={navButtonClicked}
                    navId={navId}
                    navOpen={navOpen}
                >
                    <FaEdit />
                    <NavText className="ml-1">
                        Exams
                    </NavText>
                    <span className="float-right">
                        <FaCaretDown />
                    </span>
                </NavButton>
                <DropdownNav className="" navId="exams" >
                    <StyledNavLink to="/admin/home/add/test">
                        <span className="pl-3">
                            Add Test
                        </span>
                    </StyledNavLink>
                </DropdownNav>
            </StyledNav>
        </SideNavContainer>
    );
}

const select = state => {
    return {
        navButtonClicked: state.app.navButtonClicked,
        navId: state.app.navId,
        navOpen: state.app.navOpen
    }
}

SideNav.propTypes = {
    navButtonClicked: PropTypes.bool.isRequired,
    navId: PropTypes.string.isRequired,
    navOpen: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
}

export default connect(select, { toggleNav })(SideNav);