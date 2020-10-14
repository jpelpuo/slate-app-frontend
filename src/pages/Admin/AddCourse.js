import React from 'react';
import styled from 'styled-components';
import { FaGraduationCap, FaPlus } from 'react-icons/fa';
import { Form, Jumbotron, Button } from 'react-bootstrap';

const AddCourseContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`

const Header = styled(Jumbotron)`
    padding: 1.4rem;
    border-radius: 0.5rem;
`;

const HeaderText = styled.h2`
    color: gray;
    font-weight: bolder;
    text-align: left;
`;

const Subtitle = styled.div`
    padding: 0.2rem 0.3rem;
`;

const SubtitleText = styled.h4`
    font-weight: bolder;
    text-align: left;
`;


const AddCoursePage = () => {
    return (
        <AddCourseContainer>
            <Header fluid>
                <HeaderText>
                    <FaGraduationCap /> <span>Add Course</span>
                </HeaderText>
            </Header>
            <Subtitle>
                <SubtitleText className="text-muted">
                    Enter course details
                </SubtitleText>
            </Subtitle>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Course name" required/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Subject" required/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows="8" placeholder="Course description" required/>
                </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" />
                </Form.Group>
                <Button variant="primary" type="submit" className="float-left">
                    <FaPlus/> Add course
                </Button>
            </Form>
        </AddCourseContainer>
    );
}

export default AddCoursePage;