import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Subtitle from '../../components/Subtitle';
import Header from '../../components/Header';
import { FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import { getExams, takeExam } from '../../redux/actions/examActions'

const ExamsPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 3rem;
`;

const StyledDataTable = styled(DataTable)``;

const ActionsContainer = styled.div`
    display: flex;
`;

const customStyles = {
    headCells: {
        style: {
            fontWeight: 700,
            fontSize: '1.3rem'
        }
    },
    rows: {
        style: {
            fontSize: '1rem'
        },
        highlightOnHoverStyle: {
            color: 'black',
            backgroundColor: 'darkorange',
            transitionDuration: '0.2s',
            transitionProperty: 'background-color'
        }
    },
    highlightOnHoverStyle: {
        color: 'black',
        backgroundColor: 'darkorange',
        transitionDuration: '0.15s',
        transitionProperty: 'background-color',
        borderBottomColor: 'black',
        outlineStyle: 'solid',
        outlineWidth: '1px',
        outlineColor: 'gray',
    }
}


const ExamsPage = ({ exams, getExams, takeExam }) => {

    const handleTakeExam = (examId) => {
        const examToTake = exams.filter(exam => {
            return exam._id === examId
        })

        const payload = {
            examBeingTakenId: examId,
            examToTake
        }
        
        takeExam(payload)
    }

    const columns = [
        {
            name: 'Exam Name',
            selector: 'name'
        },
        {
            name: 'Time allocated (in minutes)',
            selector: 'duration'
        },
        {
            name: 'Number of questions',
            selector: 'numberOfQuestions'
        },
        {
            name: 'Actions',
            cell: row => <ActionsContainer>
                <Button
                    variant="success"
                    onClick={() => handleTakeExam(row._id)}
                >
                    Take Exam
                </Button>
            </ActionsContainer>
        }
    ]

    useEffect(() => {
        getExams()
    }, [getExams]);

    return (
        <ExamsPageContainer>
            <Header headerText="Examinations" icon={<FaEdit />} />
            <Subtitle text="Test your knowledge" className="mb-2" />
            <StyledDataTable
                data={exams}
                columns={columns}
                title="Courses"
                noHeader
                customStyles={customStyles}
                pagination
                highlightOnHover
                keyField="_id"
                pointerOnHover
                responsive
                striped
            />
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
        </ExamsPageContainer>
    );
}

const select = state => {
    return {
        exams: state.exam.exams,
        loading: state.exam.loading
    }
}

ExamsPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    exams: PropTypes.array.isRequired,
    getExams: PropTypes.func.isRequired,
    takeExam: PropTypes.func.isRequired
}

export default connect(select, { getExams, takeExam })(ExamsPage);