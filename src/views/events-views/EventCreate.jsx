import React from "react";

/* =======================================================
    VIEW EventCreate - "/create" - Vista para crear y modificar evento

    * View solo habilitada para user logeado
    * Si es evento para modificar carga los values del form desde props

    styles:
    form con preview (arriba datos del event abajo datos de los tickets) 
*/

// Assets
import createImage from "../../assets/1.webp";
import defaultImage from "../../assets/picture.png";

// React icons
import { AiOutlineCalendar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    image: Yup.string()
        .url("El link de la imagen no es válido.")
        .required("Este campo es requerido."),
    date: Yup.date()
        .typeError("Debe ingresar una fecha válida.")
        .min(new Date(Date.now()), "Debe ingresar una fecha válida.")
        .required("Este campo es requerido."),
    hour: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "La hora no es válida.")
        .required("Este campo es requrido."),
    venue: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    producer: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    description: Yup.string().required("Este campo es requerido."),
});

const EventCreate = () => {
    const initialValues = {
        name: "",
        image: "",
        date: "",
        hour: "",
        venue: "",
        producer: "",
        description: "",
    };

    return (
        <div className="w-screen">
            <div className="h-72 relative overflow-hidden">
                <div
                    className="h-full w-full absolute top-0 left-0 bg-cover bg-bottom bg-no-repeat "
                    style={{
                        backgroundImage: `url(${createImage})`,
                    }}
                ></div>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={() => {}}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, touched, errors, values }) => (
                    <div className="grid grid-cols-2 h-fit">
                        <div className="flex flex-col place-content-center h-full">
                            <div className="floatBox w-11/12 my-6 flex flex-col h-full">
                                <Form className="">
                                    {/* Name */}
                                    <div className="flex flex-col my-2">
                                        <label
                                            htmlFor="name"
                                            className="block my-1 font-semibold"
                                        >
                                            Nombre del evento:
                                        </label>
                                        <Field
                                            className={
                                                touched.name && errors.name
                                                    ? "inputError"
                                                    : touched.name &&
                                                      !errors.name
                                                    ? "inputSuccess"
                                                    : "input"
                                            }
                                            type="text"
                                            placeholder="Nombre"
                                            name="name"
                                            autoComplete="false"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="span"
                                            className="errorMessage"
                                        />
                                    </div>

                                    {/* Image */}
                                    <div className="flex flex-col my-2">
                                        <label
                                            htmlFor="image"
                                            className="block my-1 font-semibold"
                                        >
                                            Imagen:
                                        </label>
                                        <Field
                                            className={
                                                touched.image && errors.image
                                                    ? "inputError"
                                                    : touched.image &&
                                                      !errors.image
                                                    ? "inputSuccess"
                                                    : "input"
                                            }
                                            type="text"
                                            placeholder="Url de la imagen"
                                            name="image"
                                            autoComplete="false"
                                        />
                                        <ErrorMessage
                                            name="image"
                                            component="span"
                                            className="errorMessage"
                                        />
                                    </div>

                                    {/* Row date y hour */}
                                    <div className="grid grid-cols-2">
                                        {/* Date */}
                                        <div className="flex flex-col my-2 mr-2">
                                            <label
                                                htmlFor="date"
                                                className="block my-1 font-semibold"
                                            >
                                                Fecha del evento:
                                            </label>
                                            <Field
                                                className={
                                                    touched.date && errors.date
                                                        ? "inputError"
                                                        : touched.date &&
                                                          !errors.date
                                                        ? "inputSuccess"
                                                        : "input"
                                                }
                                                type="date"
                                                name="date"
                                                autoComplete="false"
                                            />
                                            <ErrorMessage
                                                name="date"
                                                component="span"
                                                className="errorMessage"
                                            />
                                        </div>
                                        {/* Hour */}
                                        <div className="flex flex-col my-2 ml-2">
                                            <label
                                                htmlFor="hour"
                                                className="block my-1 font-semibold"
                                            >
                                                Hora de inicio:
                                            </label>
                                            <Field
                                                className={
                                                    touched.hour && errors.hour
                                                        ? "inputError"
                                                        : touched.hour &&
                                                          !errors.hour
                                                        ? "inputSuccess"
                                                        : "input"
                                                }
                                                type="time"
                                                name="hour"
                                                autoComplete="false"
                                            />
                                            <ErrorMessage
                                                name="hour"
                                                component="span"
                                                className="errorMessage"
                                            />
                                        </div>
                                    </div>

                                    {/* Row venue y producer */}
                                    <div className="grid grid-cols-2">
                                        {/* Date */}
                                        <div className="flex flex-col my-2 mr-2">
                                            <label
                                                htmlFor="venue"
                                                className="block my-1 font-semibold"
                                            >
                                                Lugar del evento:
                                            </label>
                                            <Field
                                                className={
                                                    touched.date && errors.date
                                                        ? "inputError"
                                                        : touched.date &&
                                                          !errors.date
                                                        ? "inputSuccess"
                                                        : "input"
                                                }
                                                type="text"
                                                name="venue"
                                                placeholder="Nombre del lugar"
                                                autoComplete="false"
                                            />
                                            <ErrorMessage
                                                name="venue"
                                                component="span"
                                                className="errorMessage"
                                            />
                                        </div>
                                        {/* Producer */}
                                        <div className="flex flex-col my-2 ml-2">
                                            <label
                                                htmlFor="producer"
                                                className="block my-1 font-semibold"
                                            >
                                                Productora:
                                            </label>
                                            <Field
                                                className={
                                                    touched.producer &&
                                                    errors.producer
                                                        ? "inputError"
                                                        : touched.producer &&
                                                          !errors.producer
                                                        ? "inputSuccess"
                                                        : "input"
                                                }
                                                type="text"
                                                name="producer"
                                                placeholder="Nombre de la productora"
                                                autoComplete="false"
                                            />
                                            <ErrorMessage
                                                name="producer"
                                                component="span"
                                                className="errorMessage"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="flex flex-col my-2">
                                        <label
                                            htmlFor="description"
                                            className="block my-1 font-semibold"
                                        >
                                            Description:
                                        </label>
                                        <Field
                                            className={
                                                touched.description &&
                                                errors.description
                                                    ? "inputTextAreaError"
                                                    : touched.description &&
                                                      !errors.description
                                                    ? "inputTextAreaSuccess"
                                                    : "inputTextArea"
                                            }
                                            component="textarea"
                                            placeholder="Descripción de tu evento"
                                            name="description"
                                            autoComplete="false"
                                        />
                                        <ErrorMessage
                                            name="description"
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
                                            Crear evento
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="flex flex-col justify-content-center place-content-center">
                            <div className="floatBox w-11/12 my-6 flex flex-col">
                                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 text-center font-semibold">
                                        (Preview)
                                    </p>
                                </div>
                                <div className="h-32">
                                    <h2 className="text-4xl text-center font-semibold">
                                        {values.name
                                            ? values.name
                                            : "Nombre de tu evento"}
                                    </h2>
                                </div>
                                <div className="flex flex-col items-center mt-4">
                                    <div className="h-96 w-96 bg-gradient-to-r from-fuchsia-800 to-pink-500 rounded-xl border border-secondaryBorder">
                                        <div
                                            className="h-full w-full bg-cover bg-bottom bg-no-repeat place-content-center rounded-xl "
                                            style={{
                                                backgroundImage: `url(${
                                                    values.image
                                                        ? values.image
                                                        : defaultImage
                                                })`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center items-center gap-2 mt-4">
                                    <ImLocation2 size="1.3rem" />
                                    <span>
                                        <span className="font-semibold">
                                            {values.producer
                                                ? values.producer
                                                : "Productor del evento"}
                                        </span>{" "}
                                        -{" "}
                                        {values.venue
                                            ? values.venue
                                            : "Venue del evento"}
                                    </span>
                                    <div className="w-4 font-semibold"></div>
                                    <AiOutlineCalendar size="1.3rem" />
                                    <span className="">
                                        {values.date
                                            ? values.date
                                            : "24/10/2023"}{" "}
                                        - {values.hour ? values.hour : "23:00"}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center items-center gap-2 mt-4">
                                    <span>
                                        {values.description
                                            ? values.description
                                            : "Descripción de tu evento."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default EventCreate;
