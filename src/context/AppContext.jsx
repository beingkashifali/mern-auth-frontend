import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const AppContent = createContext();

function AppContextProvider(props) {
  axios.defaults.withCredentials = true;

  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = "https://mern-auth-backend-3-js0i.onrender.com";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      data.success ? setUserData(data.userData) : toast.error(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
}

export default AppContextProvider;
