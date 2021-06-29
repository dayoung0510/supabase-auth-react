import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signup } from "components/Signup";
import { Login } from "components/Login";
import { Dashboard } from "components/Dashboard";
import { AuthProvider } from "contexts/Auth";
import { PrivateRoute } from "./PrivateRoute";

export function App() {
  return (
    <div>
      <h1>SUPABASE AUTO REACT</h1>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}
