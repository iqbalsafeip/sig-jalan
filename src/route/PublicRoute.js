import React, { Component, useEffect } from 'react';

import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { isLogin } from 'src/redux/actions';

const PublicRoute = ({component : Component, ...rest}) => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(isLogin());
    },[])

    const is_login = useSelector(state => state.auth.is_login);
    return (
        <Route {...rest} render={props => (
            !is_login ? <Component {...props} /> : <Redirect to="/" />
        )}  />
    )
}

export default PublicRoute;