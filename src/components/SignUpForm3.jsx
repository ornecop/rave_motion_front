/* =======================================================
    Form 3 on SignUp view

    Fields: birthDay - adress
    
*/

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const validationSchema = Yup.object().shape({
    birthDay: Yup.date()
        .typeError("Debe ingresar una fecha válida.")
        .min(
            new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000),
            "Debe ingresar una fecha válida."
        )
        .max(
            new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
            "Debes ser mayor de 18 años para comprar tickets."
        )
        .required("Este campo es requerido."),
    street: Yup.string()
        .max(20, "Debe ser hasta 20 caracteres.")
        .required("Este campo es requerido."),
    number: Yup.string()
        .max(20, "Debe ser hasta 20 caracteres.")
        .required("Este campo es requerido."),
    city: Yup.string()
        .max(20, "Debe ser hasta 20 caracteres.")
        .required("Este campo es requerido."),
});

const SignUpForm3 = ({ userData }) => {
    // App login
    const initialValues = {
        birthDay: "",
        street: "",
        number: "",
        city: "",
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const user = {
            ...userData,
            birthDay: values.birthDay,
            adress: {
                street: values.street,
                number: values.number,
                city: values.city,
            },
        };

        console.log(user);

        setSubmitting(false);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, touched, errors }) => (
                <Form>
                    <h2 className="text-xl text-center my-2">
                        Últimos datos &#128513;
                    </h2>

                    {/* BirthDay */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="birthDay"
                            className="block my-1 font-semibold"
                        >
                            Fecha de nacimiento:
                        </label>
                        <Field
                            className={
                                touched.firstName && errors.firstName
                                    ? "inputError"
                                    : touched.firstName && !errors.firstName
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type="date"
                            name="birthDay"
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="birthDay"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* Dirección */}
                    <div className="mt-6 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold">
                            Dirección
                        </p>
                    </div>

                    {/* Street */}
                    <div className="flex flex-col mb-2">
                        <label
                            htmlFor="street"
                            className="block my-1 font-semibold"
                        >
                            Calle:
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
                            name="street"
                            placeholder="Calle de la dirección"
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="street"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* Number */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="street"
                            className="block my-1 font-semibold"
                        >
                            Número:
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
                            name="number"
                            placeholder="Número de la dirección"
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="number"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* City */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="city"
                            className="block my-1 font-semibold"
                        >
                            Ciudad:
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
                            name="city"
                            placeholder="Ciudad"
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="city"
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
                            Registrate
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm3;
