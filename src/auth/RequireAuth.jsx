import React, { useEffect } from "react";
import NotFound from "../views/app-views/NotFound";
// Hooks
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// Requiere que el componente children este logeado como producer y redirige a NotFound si no lo esta
const RequireAuth = ({ children }) => {
    const navigate=useNavigate();
    const {accessType} = useSelector((state) => state.userData);
    const accessRequired = accessType === 'producer';
    useEffect(()=>{
        if(!accessRequired){
            navigate("/notfound")
        }
    },[])
    return(
        accessRequired?children:<NotFound/>
    )
};

export default RequireAuth;
