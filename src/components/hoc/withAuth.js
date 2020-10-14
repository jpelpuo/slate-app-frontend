import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuth = (Component) => {
    const select = state => {
        return {
            authenticated: state.user.authenticated
        }
    }

    const AuthenticatedComponent = ({ authenticated, ...props }) => {
        return (
            authenticated ? <Component {...props} /> : <Redirect path="/" to="/auth" />
        )
    }

    return connect(select, null)(AuthenticatedComponent)
};

export default withAuth;