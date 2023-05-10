/* =======================================================
    VIEW SignUp - "/signup" - Vista para registrase

    styles:
    A un lado el form (form por pasos) y al otro una imagen o mockup del home
    1er form (email, password, passwordConfirm || registrarse con Google) 
    2do form (firstName, lastName, documentType, document)
    3er form (birthDay, adress)


    * Redirecciona al Sign In
    
*/

// React router dom
import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// React icons
import { FcGoogle } from "react-icons/fc";

// Components
import SignUpForm1 from "../../components/SignUpForm1";
import SignUpForm2 from "../../components/SignUpForm2";

const SignUp = () => {
    // Form step
    const [step, setStep] = useState(1);

    // User data
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        documentType: "",
        document: "",
        birthDay: "",
        adress: {},
    });

    // Step 1 =====================================
    const setFormData1 = ({ email, password }) => {
        setUserData({ ...userData, email: email, password: password });
        setStep((prev) => prev + 1);
    };

    // Step 2 (fistName, lastName, documentType and document)

    // Step 3 (birthDay, adress)

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col w-96 py-8 px-4 bg-secondary rounded-xl border border-secondaryBorder">
                {/* Cabezera */}

                {/* Indicador de paso */}
                <div className="grid grid-cols-3 my-2 gap-2 h-3">
                    <div className={`step ${step !== 1 && `opacity-50`}`}></div>
                    <div className={`step ${step !== 2 && `opacity-50`}`}></div>
                    <div className={`step ${step !== 3 && `opacity-50`}`}></div>
                </div>

                {/* ============================= Step 1 */}

                {step === 1 && <SignUpForm1 callBack={setFormData1} />}

                {step === 2 && <SignUpForm2 callBack={setFormData1} />}

                {step === 3 && <SignUpForm1 callBack={setFormData1} />}

                {/* Divider */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                        OR
                    </p>
                </div>

                {/* Google button (only on step 1) */}
                <button type="submit" className="grid btnPrimary">
                    <div className="flex flex-row justify-self-center items-center gap-2">
                        <FcGoogle size="1.5rem" />
                        <span className="text-lg">Registrate con Google</span>
                    </div>
                </button>

                <div className="flex flex-col mt-8">
                    <div className="text-center flex-row my-1">
                        Ya tenes una cuenta?{" "}
                        <Link className="link" to="/signin">
                            Inicia sesión.
                        </Link>
                    </div>
                    <div className="text-center flex-row my-">
                        Volver al{" "}
                        <Link className="link" to="/">
                            home.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
