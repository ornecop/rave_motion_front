import React from "react";
import Home from "../views/app-views/Home"
// Hooks
import { useSelector } from "react-redux";


// Requiere que el componente children este logeado y redirige a SigniIn si no lo esta
const RequireLogOut= ({ children }) => {
    const isLogin = useSelector((state) => state.isLogin);
    return(
        !isLogin?children:<Home/>)
    
};

export default RequireLogOut;
