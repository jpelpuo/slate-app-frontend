import React, { useRef } from 'react';
import styled from 'styled-components';
import { Form, Button, Spinner, Card } from 'react-bootstrap';
import LinkButton from '../components/LinkButton';
import { register } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { Row } = Form;


const RegisterContainer = styled(Card)`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    min-height: 100vh;
    border: none;
    border-radius: 0.5rem;
    // box-shadow: 0px 0px 57px -4px rgba(0,0,0,0.75);


    @media screen and (max-width: 768px){
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
`;

const RegisterFormContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 50%;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px){
        width: 90%;
        padding: 2rem !important;
        height: 80%;
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
    // border-top-right-radius: 0.5rem;
    // border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    box-sizing: border-box;
    transition: 0.2s all;

    
    @media screen and (max-width: 768px){
        width: 100%;
        height: 20%;
        // border-bottom-left-radius:  0.5rem;
        border-top-right-radius: 0;
        flex-flow: row nowrap;
        padding: 1rem 1rem;
    }
`;

const RegisterForm = styled(Form)`
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


const RegisterPage = ({ register, errorOccurred, errorMessage, loading, registrationSuccess }) => {

    const firstNameEl = useRef();
    const lastNameEl = useRef();
    const genderEl = useRef();
    const collegeEl = useRef();
    const mobileEl = useRef();
    const emailEl = useRef();
    const passwordEl = useRef();
    const confirmPasswordEl = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const firstName = firstNameEl.current.value.trim();
        const lastName = lastNameEl.current.value.trim();
        const gender = genderEl.current.value;
        const college = collegeEl.current.value.trim();
        const mobile = mobileEl.current.value.trim();
        const email = emailEl.current.value.trim();
        const password = passwordEl.current.value.trim();
        const confirmPassword = confirmPasswordEl.current.value.trim();

        if (password !== confirmPassword) {
            console.log("Password do not match")
            return;
        }

        const payload = {
            firstName,
            lastName,
            gender,
            college,
            mobile,
            email,
            password
        }

        register(payload)

    }

    return (
        <RegisterContainer>
            <SideInfoContainer>
                <h2>
                    <HeaderText>
                        Welcome to Slate
                    </HeaderText>
                </h2>
                <SubTitleText className="px-5 my-3">
                    Enter your details to continue where you left off
                </SubTitleText>
                <LinkButton to="/auth">
                    Sign in
                </LinkButton>
            </SideInfoContainer>
            <RegisterFormContainer className="p-5">
                <RegisterForm onSubmit={handleSubmit}>
                    <h2 className="mb-4">
                        <HeaderText>Create Account</HeaderText>
                    </h2>
                    <Card.Subtitle className="text-muted mb-4">
                        {
                            errorOccurred ?
                                <span className="text-danger">
                                    {errorMessage}
                                </span>
                                : "enter details to create account"
                        }
                    </Card.Subtitle>
                    <Form.Group controlId="firstName">
                        <Form.Control type="text" ref={firstNameEl} placeholder="First Name" />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Control type="text" ref={lastNameEl} placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Control as="select" ref={genderEl} defaultValue="Gender">
                            <option disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="college">
                        <Form.Control type="text" ref={collegeEl} placeholder="College" />
                    </Form.Group>
                    <Form.Group controlId="mobile">
                        <Form.Control type="tel" ref={mobileEl} placeholder="Mobile Number" />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control type="email" ref={emailEl} placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control type="password" ref={passwordEl} placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Control type="password" ref={confirmPasswordEl} placeholder="Confirm Password" />
                    </Form.Group>
                    <FormRow>
                        <StyledLoginButton type="submit">
                            {
                                loading
                                    ?
                                    <>
                                        <Spinner animation="border" size="sm" as="span" />
                                        <span className="ml-1">
                                            Creating account
                                        </span>
                                    </>
                                    : "Sign up"
                            }
                        </StyledLoginButton>
                    </FormRow>
                </RegisterForm>
            </RegisterFormContainer>
        </RegisterContainer>
    );
}

const select = state => {
    return {
        errorOccurred: state.user.errorOccurred,
        errorMessage: state.user.errorMessage,
        loading: state.user.loading,
        registrationSuccess: state.user.registrationSuccess
    }
}

RegisterPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    errorOccurred: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    registrationSuccess: PropTypes.bool.isRequired
}

export default connect(select, { register })(RegisterPage);