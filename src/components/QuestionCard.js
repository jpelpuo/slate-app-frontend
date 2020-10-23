import React from 'react';
import styled from 'styled-components'
import { Card, FormGroup, FormCheck } from 'react-bootstrap'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const QuestionCardContainer = styled(Card)`
    display: flex;
    flex-direction: column !important;
    justify-content: flex-start !important;
`;

const QuestionName = styled.div``;
const StyledRadio = styled(FormCheck)``;
const OptionsList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const QuestionCard = ({ question }) => {
    return (
        <QuestionCardContainer>
            <QuestionName>
                {question.question}
            </QuestionName>
            <OptionsList>
                <h4>Options</h4>
                {
                    question.answers.map((answer, index) => {
                        return (
                            <FormGroup key={index}>
                                <StyledRadio type="radio" label={answer} />
                            </FormGroup>)
                    })
                }
            </OptionsList>
        </QuestionCardContainer>
    );
}

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired
}

export default QuestionCard;