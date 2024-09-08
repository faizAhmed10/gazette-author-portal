import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthorContext from "../utils/assets/AuthorContext";

const PrivateRoute = ({ element }) => {
  let { authTokens } = useContext(AuthorContext);

  return authTokens ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
