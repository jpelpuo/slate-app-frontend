import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

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

const RegisteredCourseCard = ({ course }) => {
    return (
        <StyledCard className="bg-dark">
            <Card.Body>
                <CourseName>
                    <CourseNameText>
                        {course.courseName}
                    </CourseNameText>
                </CourseName>
                <Actions>
                    <UnregisterButton variant="danger" className="mr-2">
                        Unregister
                    </UnregisterButton>
                    <MoreButton>
                        More
                    </MoreButton>
                </Actions>
            </Card.Body>
        </StyledCard>
    );
}

RegisteredCourseCard.propTypes = {
    course: PropTypes.object.isRequired
}

export default RegisteredCourseCard;