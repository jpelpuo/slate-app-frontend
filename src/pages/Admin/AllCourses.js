import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaGraduationCap, FaTrash } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import Header from '../../components/Header';
import Subtitle from '../../components/Subtitle';
import { connect } from 'react-redux';
import { getCourses, deleteCourse } from '../../redux/actions/courseActions';
import { ToastContainer } from 'react-toastify';
import { Button } from 'react-bootstrap';


const CoursesContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const StyledDataTable = styled(DataTable)``;

const ActionsContainer = styled.div`
    display: flex;
`;

const customStyles = {
    headCells: {
        style: {
            fontWeight: 700,
            fontSize: '1.5rem'
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
            transitionProperty: 'background-color',
            // borderBottomColor: 'black',
            // outlineStyle: 'solid',
            // outlineWidth: '1px',
            // outlineColor: 'gray',
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

const AllCoursesPage = ({ courses, getCourses, courseDeleted, deleteCourse }) => {

    useEffect(() => {
        getCourses()
    }, [getCourses, courseDeleted]);

    const handleRowClick = (row) => {
        console.log(row)
    }

    const handleDelete = courseId => {
        deleteCourse({
            courseId
        })
    }

    const columns = [
        {
            name: 'Course Name',
            selector: 'courseName'
        },
        {
            name: 'Subject',
            selector: 'subject'
        },
        {
            name: 'Registered Users',
            selector: ''
        },
        {
            name: 'Actions',
            cell: row => <ActionsContainer>
                <Button
                    variant="danger"
                    onClick={() => handleDelete(row._id)}
                >
                    <FaTrash />
                </Button>
            </ActionsContainer>
        }
    ];

    return (
        <CoursesContainer>
            <Header icon={<FaGraduationCap />} headerText="Courses" />
            <Subtitle text="View all courses" />
            <StyledDataTable
                data={courses}
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
                onRowClicked={handleRowClick}
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
        </CoursesContainer>
    );
}

const select = state => {
    return {
        courses: state.course.courses,
        courseDeleted: state.course.courseDeleted
    }
}

export default connect(select, { getCourses, deleteCourse })(AllCoursesPage);