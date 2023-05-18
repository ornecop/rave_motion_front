import React from "react";

/* =======================================================
    VIEW PasswordChange - "/changepassword" - Vista para cambiar password

    * Solo se accede desde el enlace del mail 

    styles:
    password y password repeat
    boton confirmar
    Validaciones!!!

    
*/
// Hooks
import { useToggle } from "../../functions/customHooks";
// axios
import axios from 'axios';

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Validation schemas
const validationSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, "Debe tener al menos 8 caracteres")
    .matches(
        /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
        "Debe tener al menos un número y no debe contener caracteres especiales."
    )
    .required("Este campo es requerido."),
passwordConfirm: Yup.string()
    .required("Este campo es requerido.")
    .test(
        "password-match",
        "Las contraseñas no coinciden",
        function (value) {
            return this.parent.password === value;
        }
    )})


const changePasswordImage = "https://wallpapercave.com/wp/wp1889479.jpg";

const ChangePassword = () => {
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const resetPasswordToken1 = localStorage.getItem("passwordtoken")
        setSubmitting(false);
        axios.post(`http://localhost:3001/users/resetpassword/2`, { newPassword: values.password, resetPasswordToken1 })
            .then(() => {
                resetForm();
            })
            .catch((error) => {
                console.error("Error resetting password", error);
            });
    };
      const [isPasswordShow, toggleShowPassword] = useToggle();
      return (
          <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-fuchsia-800 to-pink-500">
              <div className="flex flex-col w-96 py-8 px-4 bg-slate-900 rounded-xl border border-secondaryBorder">
                  <h2 className="text-2xl text-center mb-8">
                      Cambiar contraseña
                  </h2>
                  <Formik
    initialValues={{ password: "", passwordConfirm: "" }}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
>
    {({ isSubmitting, touched, errors }) => (
        <Form className="">
            <div className="flex flex-col my-2">
                <label htmlFor="password" className="block my-1 font-semibold">
                    Nueva Contraseña:
                </label>
                <div className="relative w-full">
                    <Field
                        className={
                            touched.password && errors.password
                                ? "inputError"
                                : touched.password && !errors.password
                                ? "inputSuccess"
                                : "input"
                        }
                        type={isPasswordShow ? `text` : `password`}
                        name="password"
                        placeholder="Tu contraseña"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <button
                            onClick={toggleShowPassword}
                            type="button"
                        >
                            {isPasswordShow ? (
                                <AiFillEyeInvisible
                                    size="1.5rem"
                                    color="#c026d3"
                                />
                            ) : (
                                <AiFillEye
                                    size="1.5rem"
                                    color="#c026d3"
                                />
                            )}
                        </button>
                    </div>
                </div>
                <ErrorMessage
                    name="password"
                    component="span"
                    className="errorMessage"
                />
            </div>

            <div className="flex flex-col my-2">
                <label htmlFor="passwordConfirm" className="block my-1 font-semibold">
                    Confirmar Contraseña:
                </label>
                <div className="relative w-full">
                    <Field
                        className={
                            touched.passwordConfirm && errors.passwordConfirm
                                ? "inputError"
                                : touched.passwordConfirm && !errors.passwordConfirm
                                ? "inputSuccess"
                                : "input"
                        }
                        type={isPasswordShow ? `text` : `password`}
                        name="passwordConfirm"
                        placeholder="Confirma tu contraseña"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <button
                            onClick={toggleShowPassword}
                            type="button"
                        >
                            {isPasswordShow ? (
                                <AiFillEyeInvisible
                                    size="1.5rem"
                                    color="#c026d3"
                                />
                            ) : (
                                <AiFillEye
                                    size="1.5rem"
                                    color="#c026d3"
                                />
                            )}
                        </button>
                    </div>
                </div>
                <ErrorMessage
                    name="passwordConfirm"
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