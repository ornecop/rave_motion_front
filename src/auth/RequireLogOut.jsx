import React, { useEffect } from "react";
import Home from "../views/app-views/Home"
// Hooks
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// Requiere que el componente children este logeado y redirige a SigniIn si no lo esta
const RequireLogOut= ({ children }) => {
    const navigate=useNavigate();
    const isLogin = useSelector((state) => state.isLogin);
    useEffect(()=>{
        if(isLogin){
            navigate("/")
        }
    },[])
    return(
        !isLogin?children:<Home/>)
    
};

export default RequireLogOut;
