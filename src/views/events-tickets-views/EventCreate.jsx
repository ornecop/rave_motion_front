/* =======================================================
    VIEW EventCreate - "/create" - Vista para crear y modificar evento

    * View solo habilitada para user logeado
    * Si es evento para modificar carga los values del form desde props

    styles:
    form con preview  
*/

// Assets
import defaultImage from "../../assets/picture.png";
import { AiOutlineCalendar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Hooks / funciones
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCurrentDate from "../../functions/getCurrentDate";

// Redux
import { connect } from "react-redux";
import {
    getEventById,
    removeEventDetail,
} from "../../redux/actions/eventsActions";
import { setGlobalError } from "../../redux/actions/appActions";
import { setGlobalSuccess } from "../../redux/actions/appActions";

// axios
import axios from "axios";

// Validation schemas
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, "Debe ser hasta 50 caracteres.")
        .required("Este campo es requerido."),
    //image:
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

const EventCreate = (props) => {
    // Actions & global state from props
    const { userData, eventDetail } = props;
    const {
        getEventById,
        removeEventDetail,
        setGlobalError,
        setGlobalSuccess,
    } = props;

    // Get event if param
    const { eventId } = useParams();

    useEffect(() => {
        eventId && getEventById(eventId);

        return () => {
            removeEventDetail();
        };
    }, [eventId, getEventById, removeEventDetail]);

    let initialValues = {};
    useEffect(() => {
        eventDetail.id
            ? (initialValues = eventDetail)
            : (initialValues = {
                  name: "",
                  image: "",
                  date: "",
                  hour: "",
                  venue: "",
                  producer: "",
                  description: "",
              });
    }, [eventDetail]);

    // Handle Submit
    const navigate = useNavigate();

    const [imageDataUrl, setImageDataUrl] = useState("");
    const [imageError, setImageError] = useState({ status: "", disabled: "y" });
    const [imageName, setImageName] = useState({ name: "" });

    // Image field handle & error
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split(".").pop().toLowerCase();
            if (
                fileExtension === "jpg" ||
                fileExtension === "jpeg" ||
                fileExtension === "png"
            ) {
                setImageError({ status: "", disabled: "" });
                setImageName({ name: fileName });
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataURL = e.target.result;
                    setImageDataUrl(dataURL);
                };
                reader.readAsDataURL(file);
            } else {
                setImageName({ name: "" });
                setImageDataUrl("");
                setImageError({
                    disabled: "y",
                    status: "Debe seleccionar una imagen valida. (.jpg .png .jpeg)",
                });
            }
        }
    };

    const errorImageHandler = () => {
        if (!imageDataUrl) {
            setImageDataUrl("error");
        } else {
            return;
        }
    };

    // Submit
    const handleSubmitEventCreate = async (
        values,
        { setSubmitting, resetForm }
    ) => {
        const event = { ...values, userId: userData.id, image: imageDataUrl };
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/events/eventcreate`,
                event
            );
            const newEvent = response.data;
            setGlobalSuccess(
                `El evento "${newEvent.name}" se ha creado correctamente.`
            );
            navigate(`/create/tickets/${newEvent.id}`);
        } catch (error) {
            setGlobalError(error.response.data.error);
        }
        setSubmitting(false);
        resetForm();
    };

    return (
        <div className="w-screen">
            <div className="h-60 relative overflow-hidden">
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
                            <Form className="floatBox my-6 mx-6 flex flex-col h-full justify-center">
                                <div>
                                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <p className="mx-4 mb-0 text-center font-semibold">
                                            Crear o modificar evento:
                                        </p>
                                    </div>
                                </div>
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
                                                : touched.name && !errors.name
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
                                        className="inputFile"
                                        onChange={handleImageChange}
                                        name="image"
                                        autoComplete="true"
                                        title=""
                                        style={{ color: "rgba(37, 40, 80, 0)" }}
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                    />
                                    <span className="errorMessage">
                                        {imageError && imageError.status}
                                    </span>
                                    <span
                                        className="errorMessage"
                                        style={{ color: "white" }}
                                    >
                                        {imageName && imageName.name}
                                    </span>
                                    <span className="errorMessage">
                                        {imageDataUrl === "error" &&
                                            "Este campo es requerido."}
                                    </span>
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
                                        onClick={errorImageHandler}
                                        disabled={
                                            isSubmitting && imageError.disabled
                                        }
                                    >
                                        Crear o modificar evento
                                    </button>
                                </div>
                            </Form>
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
                                            : "Lugar del evento"}
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
        eventDetail: state.eventDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEventById: (eventId) => dispatch(getEventById(eventId)),
        removeEventDetail: () => dispatch(removeEventDetail()),
        setGlobalError: (error) => dispatch(setGlobalError(error)),
        setGlobalSuccess: (message) => dispatch(setGlobalSuccess(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
