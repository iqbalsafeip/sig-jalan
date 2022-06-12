import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";
import "./scss/style.scss";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              name="Login Page"
              component={Login}
            />
            <PublicRoute
              exact
              path="/register"
              name="Register Page"
              component={Register}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <PrivateRoute path="/" name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;