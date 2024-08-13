import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";



const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const ipAddress = "192.168.1.101"

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({email: "", username: ''});
  const [loading, setLoading] = useState(false);


  


  useEffect(() => {
// we run this to check if we're still logged in, we will check if users is there or not
// if(user.email){
//   setIsLogged(true)
//   console.log("logged in: ",  user);
//   router.replace("/home")
// }
// else{
//   setIsLogged(false)
//   console.log("Not logged");
// }
   
   
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        ipAddress
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;