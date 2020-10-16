import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisteredCourseCard from '../../components/RegisteredCourseCard';
import Subtitle from '../../components/Subtitle';
import Header from '../../components/Header';
import { FaGraduationCap } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 3rem;
    transition: 0.2s all;
`;


const HomePage = ({ registeredCourses }) => {
    const renderRows = (courses) => {
        for (let counter = 0; counter <= courses.length; counter++) {
            if (counter % 3 === 0) {
                return (
                    <Row className="">
                        {
                            courses.map((course, index) => {
                                return (
                                    <Col lg={4} key={index}>
                                        {
                                            <RegisteredCourseCard course={course} />
                                        }
                                    </Col>
                                )
                            })
                        }
                    </Row>
                )
            }
        }
    }
    return (
        <HomePageContainer>
            <Header headerText="Your courses" icon={<FaGraduationCap />} />
            <Subtitle text="See courses you're taking" className="mb-2" />
            {
                renderRows(registeredCourses)
            }
        </HomePageContainer>
    );
}

const select = state => {
    return {
        registeredCourses: state.user.registeredCourses
    }
}

HomePage.propTypes = {
    registeredCourses: PropTypes.array.isRequired
}

export default connect(select, null)(HomePage);