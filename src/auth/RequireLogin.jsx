import React from "react";
import SignIn from "../views/users-views/SignIn";
// Hooks
import { useSelector } from "react-redux";


// Requiere que el componente children este logeado y redirige a SigniIn si no lo esta
const RequireLogin = ({ children }) => {
    const isLogin = useSelector((state) => state.isLogin);
    return(
        isLogin?children:<SignIn/>
    )
};

export default RequireLogin;
