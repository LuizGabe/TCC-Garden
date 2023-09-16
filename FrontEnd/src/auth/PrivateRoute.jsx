import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../api/user.api.js';
import { UserContext } from '../context/UserContext.jsx';

function PrivateRoute({ children }) {
  console.log('PrivateRoute is rendering');
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    async function checkAuthentication() {
      try {
        const response = await User.isAuthenticated(token);
        console.log(response.data);

        if (response.status === 200 && user ) {
          setIsAuthenticated(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log('Authentication failed:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    }

    checkAuthentication();
  }, [navigate]);

  if (isAuthenticated) {
    return children;
  } else {
    return null;
  }
}

export default PrivateRoute;
