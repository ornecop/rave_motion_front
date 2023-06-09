/* =======================================================
    Form 2 on SignUp view

    Fields: firstName - lastName - documentType - document
    
*/

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
    setSignUserError,
    removeSignUserError,
} from "../redux/actions/usersActions";

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Validation schemas
const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(25, "Debe ser hasta 25 caracteres.")
        .required("Este campo es requerido."),
    lastName: Yup.string()
        .max(25, "Debe ser hasta 25 caracteres.")
        .required("Este campo es requerido."),
    documentType: Yup.string()
        .oneOf(["DNI", "Pasaporte", "Cedula"])
        .required("Por favor selecciona un tipo de documento."),
    document: Yup.string()
        .max(10, "Debe ser hasta 10 caracteres.")
        .required("Este campo es requerido."),
});

const SignUpForm2 = ({ callBack }) => {
    // App login
    const initialValues = {
        firstName: "",
        lastName: "",
        documentType: "",
        document: "",
    };

    const dispatch = useDispatch();
    const userSignError = useSelector((state) => state.userSignError);
    const handleNext = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/users/signup2`, {
                documentType: values.documentType,
                document: values.document,
            });
            callBack({
                firstName: values.firstName.trim(),
                lastName: values.lastName.trim(),
                documentType: values.documentType,
                document: values.document,
            });
            dispatch(removeSignUserError());
        } catch (error) {
            dispatch(setSignUserError(error.response.data.error));
        }
        setSubmitting(false);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleNext}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, touched, errors, values }) => (
                <Form>
                    <h2 className="text-xl text-center my-2">
                        Ya falta poco...
                    </h2>

                    {userSignError &&
                        (!touched.firstName || !values.firstName) && (
                            <div className="flex justify-center flex-row my-1">
                                <span className="errorMessage">
                                    {userSignError}
                                </span>
                            </div>
                        )}

                    {/* FirstName */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="firstname"
                            className="block my-1 font-semibold"
                        >
                            Nombre:
                        </label>
                        <Field
                            className={
                                touched.firstName && errors.firstName
                                    ? "inputError"
                                    : touched.firstName && !errors.firstName
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type="text"
                            placeholder="Tu nombre"
                            name="firstName"
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="firstName"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* LastName */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="lastName"
                            className="block my-1 font-semibold"
                        >
                            Apellido:
                        </label>

                        <Field
                            className={
                                touched.lastName && errors.lastName
                                    ? "inputError"
                                    : touched.lastName && !errors.lastName
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type="text"
                            name="lastName"
                            placeholder="Tu apellido"
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="lastName"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* documentType */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="documentType"
                            className="block my-1 font-semibold"
                        >
                            Tipo de documento:
                        </label>
                        <Field
                            as="select"
                            name="documentType"
                            className={
                                touched.lastName && errors.lastName
                                    ? "inputSelectError"
                                    : touched.lastName && !errors.lastName
                                    ? "inputSelectSuccess"
                                    : "inputSelect"
                            }
                        >
                            <option value="" selected>
                                Tipo de documento
                            </option>
                            <option value="DNI">DNI</option>
                            <option value="Pasaporte">Pasaporte</option>
                            <option value="Cedula">Cedula de identidad</option>
                        </Field>

                        <ErrorMessage
                            name="documentType"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* Document */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="document"
                            className="block my-1 font-semibold"
                        >
                            Documento:
                        </label>

                        <Field
                            className={
                                touched.lastName && errors.lastName
                                    ? "inputError"
                                    : touched.lastName && !errors.lastName
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type="text"
                            name="document"
                            placeholder="Tu documento"
                        />
                        <ErrorMessage
                            name="document"
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

export default SignUpForm2;
