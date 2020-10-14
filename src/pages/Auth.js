import React, { useRef } from 'react';
import styled from 'styled-components';
import { Form, Button, Spinner, Card } from 'react-bootstrap';
import LinkButton from '../components/LinkButton';
import { connect } from 'react-redux';
import {
    adminLogin,
    userLogin
} from '../redux/actions/userActions';
import PropTypes from 'prop-types';

const { Row } = Form;


const AuthContainer = styled(Card)`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 100vh;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 57px -4px rgba(0,0,0,0.75);
    transition: 0.2s all;


    @media screen and (max-width: 768px){
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
`;

const AuthFormContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 50%;
    align-items: center;
    justify-content: center;
    transition: 0.2s all;

    @media screen and (max-width: 768px){
        width: 90%;
        padding: 2rem !important;
        height: 75%;
    }
`;

const SideInfoContainer = styled.div`
    display: flex;
    width: 50%;
    background: rgb(131,58,180);
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,91,29,1) 100%);
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    color: white;
    // border-top-left-radius: 0.5rem;
    // border-bottom-left-radius: 0.5rem;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    box-sizing: border-box;
    transition: 0.2s all;

    
    @media screen and (max-width: 768px){
        width: 100%;
        height: 25%;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
        flex-flow: row nowrap;
        padding: 0.5rem 1rem;
    }
`;

const AuthForm = styled(Form)`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    width: 100%;
`;

const HeaderText = styled.span`
    font-weight: 700;
`;

const SubTitleText = styled.div`
    @media screen and (max-width: 540px){
        display: none;
    }
`;
const FormRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledLoginButton = styled(Button)`
    background: rgb(131,58,180);
    border: none;
    border-radius: 0.9rem;
    width: 50%;
`;


const AuthPage = ({ adminLogin, userLogin, loading, errorMessage, errorOccurred }) => {

    const emailEl = useRef();
    const passwordEl = useRef();
    const adminCheckEl = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = emailEl.current.value.trim();
        const password = passwordEl.current.value.trim();
        const adminCheck = adminCheckEl.current.checked;

        const payload = {
            email,
            password
        }

        if (adminCheck) {
            adminLogin(payload);
            return;
        }
        userLogin(payload);
    }


    return (
        <AuthContainer>
            <SideInfoContainer>
                <h2>
                    <HeaderText>
                        Welcome to Slate
                    </HeaderText>
                </h2>
                <SubTitleText className="px-5 my-3">
                    Enter your details to start learning with us
                </SubTitleText>
                <LinkButton to="/register">
                    Sign Up
                </LinkButton>
            </SideInfoContainer>
            <AuthFormContainer className="p-5">
                <AuthForm onSubmit={handleSubmit}>
                    <h2 className="mb-4">
                        <HeaderText>Sign in</HeaderText>
                    </h2>
                    <Card.Subtitle className="text-muted mb-4">
                        {
                            errorOccurred ?
                                <span className="text-danger">
                                    {errorMessage}
                                </span>
                                : "enter details to sign in"
                        }

                    </Card.Subtitle>
                    <Form.Group controlId="email">
                        <Form.Control type="email" ref={emailEl} placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control type="password" ref={passwordEl} placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="adminCheck">
                        <Form.Check type="checkbox" label="Sign in as admin" ref={adminCheckEl} />
                    </Form.Group>
                    <FormRow>
                        <StyledLoginButton type="submit">
                            {
                                loading
                                    ?
                                    <>
                                        <Spinner animation="border" size="sm" as="span" />
                                        <span className="ml-1">
                                            Signing in
                                        </span>
                                    </>
                                    : "Sign in"
                            }
                        </StyledLoginButton>
                    </FormRow>
                </AuthForm>
            </AuthFormContainer>
        </AuthContainer>
    );
}

const select = state => {
    return {
        errorOccurred: state.user.errorOccurred,
        errorMessage: state.user.errorMessage,
        loading: state.user.loading
    }
}

AuthPage.propTypes = {
    adminLogin: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errorOccurred: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
}


export default connect(select, { adminLogin, userLogin })(AuthPage);