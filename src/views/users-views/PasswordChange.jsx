import React from "react";
/* =======================================================
    VIEW PasswordChange - "/changepassword" - Vista para cambiar password

    * Solo se accede desde el enlace del mail 

    styles:
    password y password repeat
    boton confirmar
    Validaciones!!!

    
*/

// Assets
const changePasswordImage = "https://wallpapercave.com/wp/wp1889479.jpg";

const PasswordChange = () => {
    return (
        <div className="w-full">
            <div
                className="h-2/6 w-full absolute top-0 left-0 bg-cover bg-bottom bg-no-repeat"
                style={{
                    backgroundImage: `url(${changePasswordImage})`,
                }}
            ></div>
        </div>
    );
};

export default PasswordChange;
