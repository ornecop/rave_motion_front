import React, { useEffect } from "react";
import SignIn from "../views/users-views/SignIn";
// Hooks
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// Requiere que el componente children este logeado y redirige a SigniIn si no lo esta
const RequireLogin = ({ children }) => {
    const navigate=useNavigate();
    const isLogin = useSelector((state) => state.isLogin);
    useEffect(()=>{
        if(!isLogin){
            navigate("/signin")
        }
    },[])
    return(
        isLogin?children:<SignIn/>
    )
};

export default RequireLogin;
