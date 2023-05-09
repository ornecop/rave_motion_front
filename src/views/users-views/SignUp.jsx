/* =======================================================
    VIEW SignUp - "/signup" - Vista para registrase

    styles:
    A un lado el form (form por pasos) y al otro una imagen o mockup del home
    1er form (email, password, passwordConfirm || registrarse con Google) 
    2do form (firstName, lastName, docType, doc, birthDay, cellPhone, adress)


    * Redirecciona al Sign In
    
*/

// React router dom
import { Link } from "react-router-dom";

// Hooks
import { useToggle } from "../../functions/customHooks";

// React icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    // Show password
    const [isPasswordShow, toggleShowPassword] = useToggle();

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <form className="flex flex-col w-96 py-8 px-4 bg-zinc-900 rounded-xl border border-zinc-800">
                {/* Cabezera */}
                <h2 className="text-4xl text-center mb-8">Crear cuenta</h2>

                {/* Indicador de paso */}
                <div className="grid grid-cols-3 my-2 gap-2 h-3">
                    <div className="flex bg-gradient-to-r from-fuchsia-800 to-pink-500 border border-fuchsia-600 rounded-tl-full rounded-br-full"></div>
                    <div className="opacity-60 flex bg-gradient-to-r from-fuchsia-800 to-pink-500 border border-fuchsia-600 rounded-tl-full rounded-br-full"></div>
                    <div className="opacity-60 flex bg-gradient-to-r from-fuchsia-800 to-pink-500 border border-fuchsia-600 rounded-tl-full rounded-br-full"></div>
                </div>

                {/* Email input group */}
                <div className="flex flex-col my-2">
                    <label htmlFor="email" className="block my-1 font-semibold">
                        Email:
                    </label>
                    <input
                        className="h-8 px-4 py-4 w/full text-black border border-fuchsia-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:border-transparent"
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
                            className="h-8 px-4 py-4 w-full text-black border border-fuchsia-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:border-transparent"
                            type={isPasswordShow ? `text` : `password`}
                            placeholder="Tu contraseña"
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
                            className="h-8 px-4 py-4 w-full text-black border border-fuchsia-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:border-transparent"
                            type={isPasswordShow ? `text` : `password`}
                            placeholder="Repetí tu contraseña"
                        />
                    </div>
                </div>

                {/* Submit input group */}
                <div className="flex flex-col mt-4">
                    <button
                        type="submit"
                        className="block w-full text-lg py-2 rounded-full bg-gradient-to-r from-fuchsia-800 to-pink-500 border border-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                    >
                        Siguiente
                    </button>
                </div>

                {/* Divider */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                        OR
                    </p>
                </div>

                {/* Google button */}

                <button
                    type="submit"
                    className="grid w-full text-lg py-2 rounded-full bg-gradient-to-r from-fuchsia-800 to-pink-500 border border-fuchsia-600 text-xl hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    <div className="flex flex-row justify-self-center items-center gap-2">
                        <FcGoogle size="1.5rem" />
                        <span className="text-lg">
                            Iniciar sesión con Google
                        </span>
                    </div>
                </button>

                <div className="flex flex-col mt-8">
                    <div className="text-center flex-row my-1">
                        Ya tenes una cuenta?{" "}
                        <Link
                            className="text-fuchsia-300 hover:text-fuchsia-600 focus:outline-none transition-colors duration-300"
                            to="/signin"
                        >
                            Inicia sesión!
                        </Link>
                    </div>
                    <div className="text-center flex-row my-">
                        Volver al{" "}
                        <Link
                            className="text-fuchsia-300 hover:text-fuchsia-600 focus:outline-none transition-colors duration-300"
                            to="/"
                        >
                            home.
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
