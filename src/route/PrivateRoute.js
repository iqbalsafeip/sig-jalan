import React, { Component, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "src/redux/actions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(isLogin());
  }, []);
  useEffect(() => {
    document.title = auth.user?.peran + " Dashboard";
  }, [auth]);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.is_login ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
