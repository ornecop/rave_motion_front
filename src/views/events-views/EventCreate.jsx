import React from "react";

/* =======================================================
    VIEW EventCreate - "/create" - Vista para crear y modificar evento

    * View solo habilitada para user logeado
    * Si es evento para modificar carga los values del form desde props

    styles:
    form con preview  
*/

// Assets
import defaultImage from "../../assets/picture.png";

// React icons
import { AiOutlineCalendar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// React router dom
import { useNavigate } from "react-router-dom";
import{ useState } from "react";
import getCurrentDate from"../../functions/getCurrentDate";
// Redux
import { connect } from "react-redux";

// axios
import axios from "axios";

// Validation schemas
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    // image: Yup.mixed()
    //     .test("tipoArchivo", "Debe ser una imagen válida", (value) => {
    //         if (value && value.file) {
    // //             const fileType = value.type;
    // //             return fileType.startsWith("image/");
    // //         }
    // //         return false;
    // //     })
    //     .required("Este campo es requerido."),
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

const createImage = "https://wallpapercave.com/wp/wp12143405.jpg";

const EventCreate = ({ userData }) => {
    // Initial values
    const initialValues = {
        name: "",
        image: "",
        date: "",
        hour: "",
        venue: "",
        producer: "",
        description: "",
    };

    
    // Handle Submit
    const navigate = useNavigate();
    
    const [imageDataUrl, setImageDataUrl] = useState("");
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();//se utiliza FileReader para leer el contenido de un archivo
          reader.onload = (e) => {//Un evento onload es un tipo de evento en JavaScript
            // que se dispara cuando se completa una operación de carga,
            //como la carga de un archivo, una imagen o un recurso externo.
            const dataURL = e.target.result;
            setImageDataUrl(dataURL);
          };
          reader.readAsDataURL(file);
        }
      };

////**
// FileReader es una interfaz proporcionada por el estándar de JavaScript File API. 
//Permite leer los contenidos de archivos de forma asíncrona en el navegador.

// La interfaz FileReader proporciona varios métodos para leer archivos,
// como readAsText(), readAsDataURL(), readAsArrayBuffer(), etc. 
//Cada método permite leer los contenidos de un archivo de diferentes maneras.

// En el código que proporcionaste, se utiliza FileReader para leer el contenido de un archivo
// utilizando el método readAsDataURL(). 
//Este método lee el archivo y devuelve los datos en forma de URL de datos (data URL),
// que es una representación en formato base64 del contenido del archivo. */
// */

    const handleSubmitEventCreate = async (
        values,
        { setSubmitting, resetForm  }
    ) => {
        const event = { ...values, userId: userData.id, image: imageDataUrl };
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/events/eventcreate`,
                event
            );
            const newEvent = response.data;
            navigate(`/create/tickets/${newEvent.id}`);
        } catch (error) {
            console.log(error);
        }
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
                            <div className="floatBox my-6 mx-6 flex flex-col h-full justify-center">
                                <Form className="">
                                    <h2 className="text-4xl text-center mb-8">
                                        Datos del evento:
                                    </h2>
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
                                            className="file: "
                                            style={{"color": "rgba(37, 40, 80, 0)"}}
                                            onChange={handleImageChange}
                                            name="image"
                                            autoComplete="true"
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                        />
                                         {!imageDataUrl && (
                                        <ErrorMessage
                                            name="image"
                                            component="span"
                                            className="errorMessage"
                                        />)}
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
                                                min={getCurrentDate()}
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
                                    <div className="flex flex-col mt-6">
                                        <button
                                            type="submit"
                                            className="btnPrimary"
                                            disabled={isSubmitting}
                                        >
                                            Ir a crear tickets para el evento
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="flex flex-col justify-content-center place-content-center">
                            <div className="floatBox my-6 mx-6 flex flex-col justify-center">
                                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 text-center font-semibold">
                                        (Preview)
                                    </p>
                                </div>
                                <div className="h-32 flex items-center justify-center ">
                                    <h2 className="text-4xl text-center align-center font-semibold">
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
                                                    imageDataUrl
                                                        ? imageDataUrl
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
                                <div className="flex flex-row justify-center items-center gap-2 mt-4 w-full min-h-fit overflow-y-scroll">
                                    {values.description
                                        ? values.description
                                        : "Descripción de tu evento."}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
};

export default connect(mapStateToProps, null)(EventCreate);
