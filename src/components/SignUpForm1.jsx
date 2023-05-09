/* =======================================================
    Form 1 on SignUp view

    Fields: email - password - passwordConfirm
    
*/

// Hooks
import { useToggle } from "../functions/customHooks";

// React icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("El email no es valido.")
        .required("Este campo es requerido."),
    password: Yup.string()
        .min(8, "Debe ser de mínimo 8 caracteres")
        .required("Este campo es requerido."),
    passwordConfirm: Yup.string()
        .required("Este campo es requerido.")
        .test(
            "password-match",
            "Las contraseñas no coinciden",
            function (value) {
                return this.parent.password === value;
            }
        ),
});

const SignUpForm1 = ({ callBack }) => {
    // Show password
    const [isPasswordShow, toggleShowPassword] = useToggle();

    // App login
    const initialValues = {
        email: "",
        password: "",
        passwordConfirm: "",
    };

    const handleNext = (values, { setSubmitting, resetForm }) => {
        callBack({ email: values.email, password: values.password });
        setSubmitting(false);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleNext}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, touched, errors }) => (
                <Form className="">
                    {/* Email */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="email"
                            className="block my-1 font-semibold"
                        >
                            Email:
                        </label>
                        <Field
                            className={
                                touched.email && errors.email
                                    ? "inputError"
                                    : touched.email && !errors.email
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type="text"
                            placeholder="Tu email"
                            name="email"
                            autoFocus
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="email"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="password"
                            className="block my-1 font-semibold"
                        >
                            Contraseña:
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
                                            color="#18181b"
                                        />
                                    ) : (
                                        <AiFillEye
                                            size="1.5rem"
                                            color="#18181b"
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

                    {/* Password Confirm */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="passwordConfirm"
                            className="block my-1 font-semibold"
                        >
                            Confirmar contraseña:
                        </label>

                        <Field
                            className={
                                touched.password && errors.password
                                    ? "inputError"
                                    : touched.password && !errors.password
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type={isPasswordShow ? `text` : `password`}
                            name="passwordConfirm"
                            placeholder="Repetí tu contraseña"
                        />
                        <ErrorMessage
                            name="passwordConfirm"
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
                            Siguiente
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm1;
