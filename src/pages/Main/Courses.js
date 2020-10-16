import React, { useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../../components/CourseCard';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCourses } from '../../redux/actions/courseActions';
import { ToastContainer } from 'react-toastify';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FaGraduationCap } from 'react-icons/fa';
import Subtitle from '../../components/Subtitle';

const CoursesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 3rem;
    transition: 0.2s all;
`;

const CoursesPage = ({ courses, getCourses, loading }) => {

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
                loading && courses.length === 0 ?
                    <div>
                        <Spinner animation="border" /> <span style={{verticalAlign: "9px"}}> Loading courses...</span>
                    </div>
                    : renderRows(courses)
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
        courses: state.course.courses,
        loading: state.course.loading
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default connect(select, { getCourses })(CoursesPage);