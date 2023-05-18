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
    newPassword: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .required("Este campo es requerido."),
});
// Assets
const changePasswordImage = "https://wallpapercave.com/wp/wp1889479.jpg";

const ChangePassword = () => {
      const handleSubmit = (values, { setSubmitting }) => {
        const resetPasswordToken1= localStorage.getItem("passwordtoken")
          setSubmitting(false);
          axios.post(`http://localhost:3001/users/resetpassword/2`,{ newPassword: values.newPassword, resetPasswordToken1 })
      };
      
      return (
          <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-fuchsia-800 to-pink-500">
              <div className="flex flex-col w-96 py-8 px-4 bg-slate-900 rounded-xl border border-secondaryBorder">
                  <h2 className="text-2xl text-center mb-8">
                      Cambiar contraseña
                  </h2>
                  <Formik
                      initialValues={{ newPassword: "" }}
                      onSubmit={handleSubmit}
                      validationSchema={validationSchema}
                  >
                      {({ isSubmitting, touched, errors }) => (
                          <Form className="">
                              <div className="flex flex-col my-2">
                                  <label htmlFor="newPassword" className="block my-1 font-semibold">
                                      Nueva Contraseña:
                                  </label>
                                  <Field
                                      className={
                                          touched.newPassword && errors.newPassword
                                              ? "inputError"
                                              : touched.newPassword && !errors.newPassword
                                              ? "inputSuccess"
                                              : "input"
                                      }
                                      type="text"
                                      placeholder="Tu nueva contraseña"
                                      name="newPassword"
                                      autoComplete="false"
                                  />
                                  <ErrorMessage
                                      name="newPassword"
                                      component="span"
                                      className="errorMessage"
                                  />
                              </div>
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
  

  export default ChangePassword; 