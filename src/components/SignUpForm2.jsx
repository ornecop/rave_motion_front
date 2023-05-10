/* =======================================================
    Form 2 on SignUp view

    Fields: firstName - lastName - documentType - document
    
*/

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    lastName: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
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

    const handleNext = (values, { setSubmitting, resetForm }) => {
        callBack({
            firstName: values.firstName,
            lastName: values.lastName,
            documentType: values.documentType,
            document: values.document,
        });
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
                    <h2 className="text-xl text-center my-2">
                        Ya falta poco...
                    </h2>

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
                            autoFocus
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
                                    ? "inputError"
                                    : touched.lastName && !errors.lastName
                                    ? "inputSuccess"
                                    : "input"
                            }
                        >
                            <option value="" selected>
                                Tipo de documento
                            </option>
                            <option value="dni">DNI</option>
                            <option value="cedulaA">Cedula Azul</option>
                            <option value="pasaporte">Pasaporte</option>
                        </Field>

                        <ErrorMessage
                            name="documentType"
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
