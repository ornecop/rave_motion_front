import React from "react";

/* =======================================================
    VIEW PasswordChange - "/changepassword" - Vista para cambiar password

    * Solo se accede desde el enlace del mail 

    styles:
    password y password repeat
    boton confirmar
    Validaciones!!!

    
*/
// axios
import axios from 'axios';

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const validationSchema = Yup.object().shape({
    mail: Yup.string()
        .email("El mail no es valido.")
        .required("Este campo es requerido."),
});

// Assets
const changePasswordImage = "https://wallpapercave.com/wp/wp1889479.jpg";

const EmailPassword = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        try {
            const response = await axios.post(`http://localhost:3001/users/resetpassword`,{ mail: values.mail })  
            const passwordToken = response.data.resetPasswordToken 
            localStorage.setItem("passwordtoken", passwordToken);
            resetForm(); // Resetea el formulario después de la solicitud exitosa
        } catch (error) {
            console.error("Error resetting password", error);
            // No se reseteará el formulario en caso de error.
        }
    };
    
    
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-fuchsia-800 to-pink-500">
            <div className="flex flex-col w-96 py-8 px-4 bg-slate-900 rounded-xl border border-secondaryBorder">
                <h2 className="text-2xl text-center mb-8">
                    Cambiar contraseña
                </h2>
                <Formik
                    initialValues={{ mail: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, touched, errors }) => (
                        <Form className="">
                            {/* mail */}
                            <div className="flex flex-col my-2">
                                <label
                                    htmlFor="mail"
                                    className="block my-1 font-semibold"
                                >
                                    mail:
                                </label>
                                <Field
                                    className={
                                        touched.mail && errors.mail
                                            ? "inputError"
                                            : touched.mail && !errors.mail
                                            ? "inputSuccess"
                                            : "input"
                                    }
                                    type="text"
                                    placeholder="Tu mail"
                                    name="mail"
                                    autoComplete="false"
                                />
                                <ErrorMessage
                                    name="mail"
                                    component="span"
                                    className="errorMessage"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col mt-4">
                                <button
                                    type="submit"
                                    className="btnPrimary"
                                    disabled={isSubmitting}
                                >
                                    Solicitar cambio de contraseña
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EmailPassword;
