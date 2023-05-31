import React, { useEffect } from "react";
import SignIn from "../views/users-views/SignIn";
// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../redux/actions/usersActions";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;




// Requiere que el componente children este logeado y redirige a SigniIn si no lo esta
const RequireLogin = ({ children }) => {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const isLogin = useSelector((state) => state.isLogin);
    // Sign In by JSW
    useEffect(()=>{
        const loginJWT=async()=>{
            const token = localStorage.getItem("token");
            const tokenGoogle = localStorage.getItem("tokenGoogle");
            if (token && !isLogin) {
                const response = await axios.post(
                    `${BACKEND_URL}/users/signinsession`,
                    {
                        token: token,
                    }
                );
                dispatch(verifyToken(response.data));
            }
            if (tokenGoogle && !isLogin) {
                const response = await axios.post(
                    `${BACKEND_URL}/users/signinsession`,
                    {
                        token: tokenGoogle,
                    }
                );
                dispatch(verifyToken(response.data));
            }
            if(!isLogin&&!token&&!tokenGoogle){
                navigate("/signin")
            }
        }
        loginJWT();
    },[])
    return(
        isLogin?children:<SignIn/>
    )
};

export default RequireLogin;
