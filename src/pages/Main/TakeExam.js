import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Subtitle from '../../components/Subtitle';
import Header from '../../components/Header';
import { FaEdit } from 'react-icons/fa';
import QuestionCard from '../../components/QuestionCard'

const TakeExamContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 3rem;
`;

const ExamName = styled.div``;
const TimeAllocation = styled.div``

const TakeExamPage = ({ examToTake }) => {


    return (
        <TakeExamContainer>
            <Header headerText="Take Exam" icon={<FaEdit />} />
            <Subtitle text="You're currently taking an exam" className="mb-2" />
            <ExamName>
                <span className="fint-weight-bolder">Exam Name </span>{examToTake[0].name}
            </ExamName>
            <TimeAllocation>
                {examToTake[0].duration}
            </TimeAllocation>
            {
                examToTake[0].questions.map((question, index) => {
                    return (
                        <QuestionCard question={question} key={index} />
                    )
                })
            }
        </TakeExamContainer>
    );
}

const select = state => {
    return {
        examToTake: state.exam.examToTake
    }
}

TakeExamPage.propTypes = {
    examToTake: PropTypes.array.isRequired
}

export default connect(select, null)(TakeExamPage);