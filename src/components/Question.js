import React from 'react';
import styled from 'styled-components';
import {FormGroup, FormControl} from 'react-bootstrap'

const QuestionContainer = styled.div`

`;

const Question = () => {
    return ( 
        <QuestionContainer>
            <FormGroup>
                <FormControl type="text" />
            </FormGroup>
        </QuestionContainer>
     );
}
 
export default Question;