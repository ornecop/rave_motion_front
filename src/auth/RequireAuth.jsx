import React from "react";
import NotFound from "../views/app-views/NotFound";
// Hooks
import { useSelector } from "react-redux";


// Requiere que el componente children este logeado como producer y redirige a NotFound si no lo esta
const RequireAuth = ({ children }) => {
    const {accessType} = useSelector((state) => state.userData);
    const accessRequired = accessType === 'producer';
    return(
        accessRequired?children:<NotFound/>
    )
};

export default RequireAuth;
