import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaGraduationCap, FaPlus } from 'react-icons/fa';
import { Form, Jumbotron, Button, Spinner } from 'react-bootstrap';
import { addCourse } from '../../redux/actions/courseActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify'

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

const AddCoursePage = ({ loading, addCourse }) => {

    const courseNameEl = useRef();
    const subjectEl = useRef();
    const descriptionEl = useRef();

    const handleSubmit = event => {
        event.preventDefault();
        const courseName = courseNameEl.current.value.trim()
        const subject = subjectEl.current.value.trim()
        const description = descriptionEl.current.value.trim();

        const payload = {
            courseName,
            subject,
            description
        }

        addCourse(payload)
    }

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
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="">
                    <Form.Control type="text" placeholder="Course name" required ref={courseNameEl} />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Control type="text" placeholder="Subject" required ref={subjectEl} />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Control as="textarea" rows="8" placeholder="Course description" required ref={descriptionEl} />
                </Form.Group>
                <Form.Group>
                    <Form.File id="" />
                </Form.Group>
                <Button variant="primary" type="submit" className="float-left">
                    {
                        loading
                            ? <Spinner animation="border" size="sm" as="span" />
                            : <FaPlus />
                    } Add course
                </Button>
            </Form>
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
        </AddCourseContainer>
    );
}

const select = state => {
    return {
        loading: state.app.loading
    }
}

AddCoursePage.propTypes = {
    loading: PropTypes.bool.isRequired,
    addCourse: PropTypes.func.isRequired
}
export default connect(select, { addCourse })(AddCoursePage);