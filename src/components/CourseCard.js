import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import generateRandomInt from '../helpers/generateRandomInt';
import { FaLeanpub } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { registerCourse } from '../redux/actions/courseActions';

const colors = ["orange", "darkorange", "aqua", "lightblue"]

const StyledCard = styled(Card)`
    display: flex;
    margin-bottom: 1.5rem;
    transition: 0.2s all;
    // height: 10rem;

    &:hover{
        transform: scale(1.05);
    }
`;

const CardHeader = styled(Card.Header)`
    background-color: ${colors[generateRandomInt(colors.length)]};
    border-none: none !important;
    border-radius: 0rem !important;
    display: flex;
    flex-direction: column;
    padding: 0.5rem !important;
`;

const HeaderText = styled.h3`
    font-weight: 600;
    text-align: center;
`;

const SubjectContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const SubjectText = styled.span``;

const Actions = styled.div`
    display: flex;
`;

const RegisterButton = styled(Button)``;
const MoreButton = styled(Button)``;

const Description = styled.div`
    overflow: hidden;
    color: white;
`;


const CourseCard = ({ course, registerCourse }) => {

    const handleRegister = courseId => {
        registerCourse({
            courseId
        })
    }
    return (
        <StyledCard>
            <CardHeader>
                <SubjectContainer className="">
                    <SubjectText>
                        <FaLeanpub /> {course.subject}
                    </SubjectText>
                </SubjectContainer>
                <HeaderText>
                    {course.courseName}
                </HeaderText>
            </CardHeader>
            <Card.Body className="bg-dark">
                <Description className="pt-2 pb-4">
                    {course.description}
                </Description>
                <Actions className="">
                    <RegisterButton
                        className="mr-2"
                        onClick={() => handleRegister(course._id)}>
                        Register
                    </RegisterButton>
                    <MoreButton>
                        Learn More
                    </MoreButton>
                </Actions>
            </Card.Body>
        </StyledCard>
    );
}

const select = state => {
    return {

    }
}

CourseCard.propTypes = {
    course: PropTypes.object.isRequired
}

export default connect(select, { registerCourse })(CourseCard);