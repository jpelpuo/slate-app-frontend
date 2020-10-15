import React, { useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../../components/CourseCard';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCourses } from '../../redux/actions/courseActions';
import { ToastContainer } from 'react-toastify';
import { Row, Col } from 'react-bootstrap';
import { FaGraduationCap } from 'react-icons/fa';
import Subtitle from '../../components/Subtitle';
// import ScrollAnimation from 'react-animate-on-scroll'

const CoursesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 3rem;
`;

const CoursesPage = ({ courses, getCourses }) => {

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
                                            <CourseCard course={course} />
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

    useEffect(() => {
        getCourses()
    }, [getCourses]);
    return (
        <CoursesContainer>
            <Header headerText="Our courses" icon={<FaGraduationCap />} />
            <Subtitle text="Browse our huge catalogue of courses" className="mb-2" />
            {
                renderRows(courses)
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

        </CoursesContainer>
    );
}

const select = state => {
    return {
        courses: state.course.courses
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired
}

export default connect(select, { getCourses })(CoursesPage);