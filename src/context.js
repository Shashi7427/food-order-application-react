import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import url from './utils/url';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  console.log("first")
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    console.log(user)
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    console.log("hey cllling the user")
    try {
      console.log("inside they try block")
      const response = await axios.get(`/api/v1/auth/showMe`)
      let data = response.data
      console.log(data,response)
      saveUser(data);
    } catch (error) {
      console.log("we had an error")
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout');
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log("hey there")
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
