import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => localStorage.getItem('jwt') ? <Component {...props} /> : <Redirect to='/' />
      }
    </Route>
)}
