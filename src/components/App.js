import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Signup } from "components/Signup";
import { Login } from "components/Login";
import { Home } from "components/Home";
import { Account } from "components/Account";
import { AuthProvider } from "contexts/Auth";
import { PrivateRoute } from "./PrivateRoute";

const Div = styled.div`
  width: 100vw;
  height: 100vh;
`;

export function App() {
  return (
    <Div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/account" component={Account} />
          </Switch>
        </AuthProvider>
      </Router>
    </Div>
  );
}
