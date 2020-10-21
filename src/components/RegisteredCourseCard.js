import React from 'react';
import styled from 'styled-components';
import { Card, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unregisterCourse } from '../redux/actions/courseActions';

const StyledCard = styled(Card)`
    margin-bottom: 1rem;
    transition: 0.2s all;

    &:hover{
        transform: scale(1.02);
    }
`;

const CourseName = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const CourseNameText = styled.span`
    font-weight: 700;
    font-size: 1.7rem;
    color: white;
`;

const UnregisterButton = styled(Button)``;
const MoreButton = styled(Button)``;

const Actions = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const RegisteredCourseCard = ({ course, loading, courseToRemove, registeredCourses, unregisterCourse }) => {

    const handleUnregister = (courseId) => {
        unregisterCourse({
            courseId
        })
    }
    return (
        <StyledCard className="bg-dark">
            <Card.Body>
                <CourseName>
                    <CourseNameText>
                        {course.courseName}
                    </CourseNameText>
                </CourseName>
                <Actions>
                    <UnregisterButton
                        variant="danger"
                        className="mr-2"
                        onClick={() => handleUnregister(course._id)}
                    >
                        {
                            loading && courseToRemove === course._id
                                ? <>
                                    <Spinner animation="border" size="sm" /> Removing
                                </>
                                : "Unregister"
                        }
                    </UnregisterButton>
                    <MoreButton>
                        More
                    </MoreButton>
                </Actions>
            </Card.Body>
        </StyledCard>
    );
}

const select = state => {
    return {
        loading: state.course.loading,
        courseToRemove: state.course.courseToRemove,
        registeredCourses: state.user.registeredCourses
    }
}

RegisteredCourseCard.propTypes = {
    course: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    registeredCourses: PropTypes.array.isRequired,
    courseToRemove: PropTypes.string.isRequired
}

export default connect(select, { unregisterCourse })(RegisteredCourseCard);