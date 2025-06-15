import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {

      const authStatus = useSelector((state) => state.auth.status);

  if (!authStatus) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected