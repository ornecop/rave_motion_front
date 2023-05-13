import React, { useState } from "react";

/* =======================================================
    VIEW EventTicketsCreate - "/create/tickets" - Vista para crear y modificar tickets de un evento

    * View solo habilitada para user logeado como producer
    * Si es evento para modificar carga los values del form desde props

    styles:
    form 
*/

// Assets
import defaultImage from "../../assets/picture.png";

// React icons

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Hooks
import { useParams } from "react-router-dom";

// Validation schemas
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    description: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    accessType: Yup.string()
        .max(20, "Debe ser hasta 20 caracteres.")
        .required("Este campo es requerido."),
    price: Yup.number()
        .positive("Debe ser mayor a 0.")
        .required("Este campo es requerido."),
    maxQuantity: Yup.number()
        .integer("Debe ser un número entero")
        .positive("Debe ser mayor a 0.")
        .required("Este campo es requerido."),
});

const createImage = "https://wallpapercave.com/wp/wp12143405.jpg";

const EventCreate = () => {
    // Event Id
    const { eventId, eventName } = useParams();

    // Tandas
    const [ticketsArray, setTicketsArray] = useState([
        {
            name: "Early Birds",
            description: "Acceso general - tanda early - Mandarine Park",
            accessType: "General",
            price: "11000",
            maxQuantity: "500",
        },
        {
            name: "Tanda 1",
            description: "Tanda 1 - Mandarine Park",
            accessType: "General",
            price: "12500",
            maxQuantity: "1000",
        },
    ]);
    const [tandas, setTandas] = useState(3);

    const initialValues = {
        name: "",
        description: "",
        accessType: "",
        price: "",
        maxQuantity: "",
    };

    const handleSubmitEventCreate = async (
        values,
        { setSubmitting, resetForm }
    ) => {
        setTicketsArray([...ticketsArray, values]);
        setTandas((prev) => prev + 1);
        setSubmitting(false);
        resetForm();
    };

    return (
        <div className="w-screen">
            <div className="h-96 relative overflow-hidden">
                <div
                    className="h-full w-full absolute top-0 left-0 bg-cover bg-bottom bg-no-repeat "
                    style={{
                        backgroundImage: `url(${createImage})`,
                    }}
                ></div>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitEventCreate}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, touched, errors, values }) => (
                    <div className="grid grid-cols-2 h-fit">
                        <div className="flex flex-col place-content-center h-full">
                            <div className="floatBox my-6 mx-6 flex flex-col h-full justify-end">
                                <Form className="">
                                    <h2 className="text-4xl text-center mb-8">
                                        Tickets para {eventName}
                                    </h2>
                                    <h5 className="text-xl text-center mb-8">
                                        Tandas creadas: {tandas}
                                    </h5>
                                    <h6 className="text-center mb-8">
                                        event Id: {eventId}
                                    </h6>
                                    {/* name */}
                                    <div className="flex flex-col my-2">
                                        <label
                                            htmlFor="name"
                                            className="block my-1 font-semibold"
                                        >
                                            Nombre del ticket:
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

                                    {/* accessType */}
                                    <div className="flex flex-col my-2">
                                        <label
                                            htmlFor="accessType"
                                            className="block my-1 font-semibold"
                                        >
                                            Tipo de acceso:
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
                                            placeholder="Vip / BackStage / Acceso general "
                                            name="accessType"
                                            autoComplete="false"
                                        />
                                        <ErrorMessage
                                            name="accessType"
                                            component="span"
                                            className="errorMessage"
                                        />
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
                                                    ? "inputError"
                                                    : touched.description &&
                                                      !errors.description
                                                    ? "inputSuccess"
                                                    : "input"
                                            }
                                            type="text"
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

                                    {/* Row price y maxQ */}
                                    <div className="grid grid-cols-2">
                                        {/* Price */}
                                        <div className="flex flex-col my-2 mr-2">
                                            <label
                                                htmlFor="price"
                                                className="block my-1 font-semibold"
                                            >
                                                Precio:
                                            </label>
                                            <Field
                                                className={
                                                    touched.price &&
                                                    errors.price
                                                        ? "inputError"
                                                        : touched.price &&
                                                          !errors.price
                                                        ? "inputSuccess"
                                                        : "input"
                                                }
                                                type="number"
                                                name="price"
                                                autoComplete="false"
                                            />
                                            <ErrorMessage
                                                name="price"
                                                component="span"
                                                className="errorMessage"
                                            />
                                        </div>
                                        {/* maxQuantity */}
                                        <div className="flex flex-col my-2 mr-2">
                                            <label
                                                htmlFor="maxQuantity"
                                                className="block my-1 font-semibold"
                                            >
                                                Cantidad de tickets:
                                            </label>
                                            <Field
                                                className={
                                                    touched.maxQuantity &&
                                                    errors.maxQuantity
                                                        ? "inputError"
                                                        : touched.maxQuantity &&
                                                          !errors.maxQuantity
                                                        ? "inputSuccess"
                                                        : "input"
                                                }
                                                type="number"
                                                name="maxQuantity"
                                                autoComplete="false"
                                            />
                                            <ErrorMessage
                                                name="maxQuantity"
                                                component="span"
                                                className="errorMessage"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="flex flex-col mt-6">
                                        <button
                                            type="submit"
                                            className="btnPrimary"
                                            disabled={isSubmitting}
                                        >
                                            Crear tanda
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="flex flex-col justify-content-center place-content-center ">
                            {!ticketsArray.length ? (
                                <div className="floatBox my-6 mx-6 justify-center">
                                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <p className="mx-4 mb-0 text-center font-semibold">
                                            (Preview)
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="floatBox my-6 mx-6 justify-center">
                                    <div className="mb-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <p className="mx-4 mb-0 text-center font-semibold">
                                            (Preview tanda)
                                        </p>
                                    </div>
                                    <table className="w-full text-sm text-center">
                                        <thead className="text-xs">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Nro de tanda
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Nombre
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Descripción
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Precio
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Cantidad de tickets
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ticketsArray.map(
                                                (tanda, index) => (
                                                    <tr className="border-b">
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                                        >
                                                            {index}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {tanda.name}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {tanda.description}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            $ {tanda.price}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {tanda.maxQuantity}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div className="floatBox py-2 mb-6 mx-6 justify-center">
                                <button
                                    type="submit"
                                    className="btnPrimary"
                                    disabled={ticketsArray.length}
                                >
                                    Agregar tandas al evento
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default EventCreate;
