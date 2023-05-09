/* =======================================================
    VIEW SignUp - "/signup" - Vista para registrase

    styles:
    A un lado el form (form por pasos) y al otro una imagen o mockup del home
    1er form (email, password, passwordConfirm || registrarse con Google) 
    2do form (firstName, lastName, docType, doc)
    3er form (birthDay, adress)


    * Redirecciona al Sign In
    
*/

// React router dom
import { Link } from "react-router-dom";

// Hooks
import { useToggle } from "../../functions/customHooks";
import { useState, useEffect } from "react";

// React icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    // Form step
    const [step, setStep] = useState(1);

    // Show password
    const [isPasswordShow, toggleShowPassword] = useToggle();
    useEffect(() => {
        isPasswordShow && toggleShowPassword();
    }, [step]);

    // Step 1 =====================================

    // Step 2 (fistName, lastName, docType and doc)

    // Step 3 (birthDay, adress)

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <form className="flex flex-col w-96 py-8 px-4 bg-secondary rounded-xl border border-secondaryBorder">
                {/* Cabezera */}
                <h2 className="text-4xl text-center mb-8">Crear cuenta</h2>

                {/* Indicador de paso */}
                <div className="grid grid-cols-3 my-2 gap-2 h-3">
                    <div className="step"></div>
                    <div className="step opacity-50"></div>
                    <div className="step opacity-40"></div>
                </div>

                {/* ============================= Step 1 */}

                {/* Email input group */}
                <div className="flex flex-col my-2">
                    <label htmlFor="email" className="block my-1 font-semibold">
                        Email:
                    </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Tu email"
                        autoFocus
                        autoComplete="false"
                    />
                </div>

                {/* Password input group */}
                <div className="flex flex-col my-2">
                    <label
                        htmlFor="password"
                        className="block my-1 font-semibold"
                    >
                        Contraseña:
                    </label>
                    <div className="relative w-full">
                        <input
                            className="input"
                            type={isPasswordShow ? `text` : `password`}
                            placeholder="Tu contraseña"
                            autoComplete="false"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button onClick={toggleShowPassword} type="button">
                                {isPasswordShow ? (
                                    <AiFillEyeInvisible
                                        size="1.5rem"
                                        color="#18181b"
                                    />
                                ) : (
                                    <AiFillEye size="1.5rem" color="#18181b" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Password confirm */}
                <div className="flex flex-col my-2">
                    <label
                        htmlFor="password"
                        className="block my-1 font-semibold"
                    >
                        Confirmar contraseña:
                    </label>
                    <div className="relative w-full">
                        <input
                            className="input"
                            type={isPasswordShow ? `text` : `password`}
                            placeholder="Repetí tu contraseña"
                            autoComplete="false"
                        />
                    </div>
                </div>

                {/* Submit input group */}
                <div className="flex flex-col mt-4">
                    <button type="submit" className="btnPrimary">
                        Siguiente
                    </button>
                </div>

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
            </form>
        </div>
    );
};

export default SignUp;
