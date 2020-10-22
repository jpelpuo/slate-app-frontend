import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import Subtitle from '../../components/Subtitle';
import { FaEdit } from 'react-icons/fa';
import { Form, Button, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { addExam } from '../../redux/actions/examActions'

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

const AddExamPage = ({ addExam, loading }) => {
    const examNameEl = useRef();
    const durationEl = useRef();

    const [questions, setQuestions] = useState([
        {
            questionId: "question-0",
            question: "",
            answers: [""],
            correctAnswer: "",
            answerIds: ["answer-0"],
        }
    ])

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            questionId: `question-${questions.length}`,
            question: "",
            answers: [""],
            answerIds: ["answer-0"],
            correctAnswer: ""
        }])
    }

    const handleAddAnswer = (_, questionsToUpdate, questionId) => {
        const questionsAndAnswers = questionsToUpdate;
        const newState = questionsAndAnswers.map(question => {
            if (questionId === question.questionId) {
                question.answerIds = [...question.answerIds, `answer-${question.answerIds.length}`]
                question.answers.push("")
            }
            return question
        })
        setQuestions(newState)
    }

    const handleQuestionChange = (event, questionsToUpdate) => {
        const questionsAndAnswers = questionsToUpdate;
        const newState = questionsAndAnswers.map((question) => {
            if (question.questionId === event.target.name) {
                question.question = event.target.value.trim()
            }
            return question
        })
        setQuestions(newState)
    }

    const handleAnswerChange = (event, questionsToUpdate) => {
        const questionsAndAnswers = questionsToUpdate;
        const newState = questionsAndAnswers.map(question => {
            const isQuestionId = event.target.name.includes(question.questionId)
            if (isQuestionId) {
                question.answerIds.forEach(answerId => {
                    const isAnswerId = event.target.name.includes(answerId)
                    if (isAnswerId) {
                        question.answers[question.answerIds.indexOf(answerId)] = event.target.value.trim()
                        return
                    }
                })
            }
            return question
        })
        setQuestions(newState)
    }

    const handleCorrectAnswerChange = (event, questionsToUpdate) => {
        const questionsAndAnswers = questionsToUpdate;
        const newState = questionsAndAnswers.map(question => {
            const isQuestionId = event.target.name.includes(question.questionId)
            if (isQuestionId) {
                question.correctAnswer = event.target.value.trim()
            }
            return question;
        })
        setQuestions(newState)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const questionsToSanitize = JSON.parse(JSON.stringify(questions))

        const name = examNameEl.current.value.trim()
        const duration = durationEl.current.value.trim()

        const sanitizedQuestions = questionsToSanitize.map(question => {
            delete question.questionId
            delete question.answerIds
            return question
        })

        console.log(sanitizedQuestions)

        const payload = {
            name,
            duration,
            questions: sanitizedQuestions
        }

        addExam(payload)

        examNameEl.current.value = ""
        durationEl.current.value = ""

        setQuestions([
            {
                questionId: "question-0",
                question: "",
                answers: [""],
                correctAnswer: "",
                answerIds: ["answer-0"],
            }
        ])
    }


    useEffect(() => {
        console.log(questions)
    }, [questions]);

    return (
        <StyledWrapper>
            <Header icon={<FaEdit />} headerText="Add Exam" />
            <Subtitle text="Enter exam questions" />
            <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Exam Name" ref={examNameEl} required />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" placeholder="Duration in minutes" ref={durationEl} required />
                </Form.Group>
                <h4 className="text-muted text-left">Questions</h4>
                {
                    questions.map((question, index) => {
                        return (
                            <QuestionContainer key={question.questionId} id={index}>
                                <Form.Group>
                                    <Form.Control
                                        name={`question-${index}`}
                                        onChange={(event) => handleQuestionChange(event, questions)}
                                        type="text"
                                        value={question.question}
                                        placeholder={`Question ${index}`}
                                        required />
                                </Form.Group>
                                {
                                    question.answerIds.map((answer, index) => {
                                        return (
                                            <Form.Group key={answer}>
                                                <Form.Control
                                                    name={`${question.questionId}-answer-${index}`}
                                                    onChange={(event) => handleAnswerChange(event, questions)}
                                                    type="text"
                                                    value={question.answers[question.answerIds.indexOf(answer)]}
                                                    placeholder={`Answer ${index}`}
                                                    required />
                                            </Form.Group>
                                        )
                                    })
                                }
                                <Form.Group>
                                    <AddAnswerButton
                                        className="float-right mb-3"
                                        onClick={(event) => handleAddAnswer(event, questions, `question-${index}`)}>
                                        <FaPlus /> <span> Add Answer</span>
                                    </AddAnswerButton>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        name={`question-${index}`}
                                        onChange={(event) => handleCorrectAnswerChange(event, questions)}
                                        type="text"
                                        value={question.correctAnswer}
                                        placeholder="Correct answer" />
                                </Form.Group>
                            </QuestionContainer>
                        )
                    })
                }
                <Form.Group>
                    <AddQuestionButton
                        className="float-right"
                        onClick={handleAddQuestion}
                    >
                        <FaPlus /> <span> Add Question</span>
                    </AddQuestionButton>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit" className="float-left">
                        {
                            loading
                                ? <Spinner animation="border" size="sm" as="span" />
                                : <FaPlus />
                        } Add Exam
                </Button>
                </Form.Group>
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
        </StyledWrapper>
    );
}

const select = state => {
    return {
        loading: state.exam.loading
    }
}

AddExamPage.propTypes = {
    addExam: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

export default connect(select, { addExam })(AddExamPage);