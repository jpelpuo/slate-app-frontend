import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import Subtitle from '../../components/Subtitle';
import { FaEdit } from 'react-icons/fa';
import { Form, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const QuestionContainer = styled.div`
    padding: 1rem;
    border: 1px solid lightgray;
    margin-bottom: 1rem;
    box-sizing: border-box;
`;

const AddQuestionButton = styled(Button)``;

const AddAnswerButton = styled(Button)``;

const AddExamPage = () => {
    const [questions, setQuestions] = useState(["question-1"])
    const [answers, setAnswers] = useState(["answer-1"])

    const handleAddQuestion = () => {
        setQuestions([...questions, `question-${questions.length + 1}`])
    }

    const handleAddAnswer = () => {
        setAnswers([...answers, `answer-${answers.length + 1}`])
    }

    return (
        <StyledWrapper>
            <Header icon={<FaEdit />} headerText="Add Exam" />
            <Subtitle text="Enter exam questions" />
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Exam Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" placeholder="Duration in minutes" />
                </Form.Group>
                <h4 className="text-muted text-left">Questions</h4>
                {
                    questions.map((question, index) => {
                        return (
                            <QuestionContainer key={question} id={index}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Question" />
                                </Form.Group>
                                {
                                    answers.map((answer) => {
                                        return (
                                            <Form.Group key={answer}>
                                                <Form.Control type="text" placeholder="Answer" />
                                            </Form.Group>
                                        )
                                    })
                                }
                                <Form.Group>
                                    <AddAnswerButton className="float-right mb-3" onClick={handleAddAnswer}>
                                        <FaPlus /> <span> Add Answer</span>
                                    </AddAnswerButton>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Correct answer" />
                                </Form.Group>
                            </QuestionContainer>
                        )
                    })
                }
                <Form.Group>
                    <AddQuestionButton className="float-right" onClick={handleAddQuestion}>
                        <FaPlus /> <span> Add Question</span>
                    </AddQuestionButton>
                </Form.Group>
            </Form>
        </StyledWrapper>
    );
}

export default connect()(AddExamPage);