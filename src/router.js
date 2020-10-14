import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register'
import IndexLayout from './layout/IndexLayout';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Main/Home';
import CoursesPage from './pages/Main/Courses';
import ExamsPage from './pages/Main/Exams';
import ProfilePage from './pages/Main/Profile';
import PicturePage from './pages/Picture';
import { connect } from 'react-redux';
import AdminHomePage from './pages/Admin/Home';
import AddCoursePage from './pages/Admin/AddCourse';

const userRoutes = [
    {
        path: "/auth",
        exact: true,
        component: <AuthPage />
    },
    {
        path: "/register",
        exact: true,
        component: <RegisterPage />
    },
    {
        path: "/user/picture",
        exact: true,
        component: <PicturePage />
    }
]


const mainAppRoutes = [
    {
        path: "/user/home",
        exact: true,
        component: <HomePage />
    },
    {
        path: "/user/courses",
        exact: true,
        component: <CoursesPage />
    },
    {
        path: "/user/exams",
        exact: true,
        component: <ExamsPage />
    },
    {
        path: "/user/profile",
        exact: true,
        component: <ProfilePage />
    },
    {
        path: "/admin/home",
        exact: true,
        component: <AdminHomePage />
    },
    {
        path: "/admin/add/course",
        exact: true,
        component: <AddCoursePage />
    },
]


const Router = ({ history, accessToken }) => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Redirect exact path="/" to="/auth" />
                {
                    accessToken && <Redirect path="/auth" to="/user/home" />
                }
                {
                    accessToken && <Redirect path="/register" to="/user/home" />
                }
                {
                    accessToken && <Redirect path="/picture" to="/user/home" />
                }
                {

                    userRoutes.map(route => (
                        <Route
                            exact={route.exact}
                            path={route.path}
                            key={route.path}
                            render={() => (
                                <IndexLayout>
                                    {route.component}
                                </IndexLayout>
                            )} />
                    ))

                }
                {
                    <MainLayout>
                        {
                            mainAppRoutes.map(route => (
                                <Route
                                    exact={route.exact}
                                    path={route.path}
                                    key={route.path}>
                                    {route.component}
                                </Route>
                            ))
                        }

                    </MainLayout>
                }
                <Redirect path="/" to="/auth" exact />
            </Switch>
        </ConnectedRouter>
    );
}

const select = state => {
    return {
        accessToken: state.user.accessToken
    }
}

export default connect(select, null)(Router);