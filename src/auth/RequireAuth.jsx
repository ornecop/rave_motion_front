import React from "react";

// Hooks
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Requiere que el componente children este logeado y redirige a SigniIn si no lo esta
const RequireAuth = ({ isLogged, children }) => {
    const isLogin = useSelector((state) => state.isLogin);

    if (!isLogin) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default RequireAuth;
