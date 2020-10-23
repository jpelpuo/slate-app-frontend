import React from 'react';
import styled from 'styled-components'
import { Card, FormGroup, FormCheck } from 'react-bootstrap'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const QuestionCardContainer = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    margin-bottom: 1rem;
    color: white;
`;

const QuestionName = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const StyledRadio = styled(FormCheck)``;
const OptionsList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const QuestionCard = ({ question }) => {
    return (
        <QuestionCardContainer className="bg-dark">
            <QuestionName>
                {question.question}
            </QuestionName>
            <OptionsList>
                <h4 className="text-left">Options</h4>
                {
                    question.answers.map((answer, index) => {
                        return (
                            <FormGroup key={index} style={{ display: "flex", justifyContent: "flex-start" }}>
                                <StyledRadio name={`${question.question}-options`} type="radio" label={answer} />
                            </FormGroup>)
                    })
                }
            </OptionsList>
            {/* <Actions>
                <Button>
                    Next
                </Button>
            </Actions> */}
        </QuestionCardContainer>
    );
}

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired
}

export default QuestionCard;