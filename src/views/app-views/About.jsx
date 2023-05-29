/* =======================================================
VIEW About - "/about" - 

styles:
*/
// Hooks
import { useState } from "react";

// Assets
import { FaLinkedin, FaGithub } from "react-icons/fa";
import about from '../../assets/about.png'
import fondoabout from '../../assets/fondoabout.jpg'

const About = () => {
    const nosotros = [
        {
            id: 1,
            nombre: "Denis Roldan",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+54 9 341 712-2685",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/",
        },
        {
            id: 2,
            nombre: "Carlos Mosquera",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+57 300 6988219",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/",
        },
        {
            id: 3,
            nombre: "Enmanuel Reyes",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+57 305 7469007",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/",
        },
        {
            id: 4,
            nombre: "Facundo Casado",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+54 9 11 5736-3595",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/",
        },
        {
            id: 5,
            nombre: "Facundo Torres",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+54 9 221 303-7321",
            github: "https://github.com/juanperez",
            linkedin: "https://www.linkedin.com/in/juanperez/",
        },
        {
            id: 6,
            nombre: "Francisco Yorlano",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+54 9 221 603-0259",
            github: "https://github.com/juanperez",
            linkedin: "https://www.linkedin.com/in/juanperez/",
        },
        {
            id: 7,
            nombre: "Ornella Copula",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+54 9 351 392-8047",
            github: "https://github.com/juanperez",
            linkedin: "https://www.linkedin.com/in/juanperez/",
        },
    ];
    

    return (
        <div className="w-full min-h-screen">
           <div className="h-96 overflow-hidden relative">
      <img className="" src={fondoabout} alt="background" />
    </div>

    {/* RAVE MOTION */}
    <div className="ml-16 mt-16">
      <img className="w-96" src={about} alt="logo" />

      <div className="">
        <p className="text-3xl font-extralight">
          Somos apasionados de la música electrónica, queremos brindarte una experiencia única
          <br /> para que disfrutes al máximo de los eventos más emocionantes del país
        </p>
      </div>

      <div className="hidden">
        <p>Nos enfocamos en que disfrutes al máximo de los mejores eventos del país</p>
      </div>
    </div>

    <div>
      <h1 className="flex justify-center text-4xl text-pink-500 font-semibold mt-20 mb-9">
        ¿QUÉ OFRECEMOS?
      </h1>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <div className="p-8 flex flex-col justify-center w-96 h-80 rounded-md bg-slate-900 card group">
          <h3 className="font-bold text-4xl text-center leading-36 relative top-10 block group-hover:invisible leading-snug">
            Amplia selección de Eventos
          </h3>
          <p className="text-xl text-center leading-24 tracking-0 font-normal w-fit block mt-4 sm:mt-8 opacity-0 group-hover:opacity-100 relative -top-24 sm:bottom-16">
            Trabajamos en colaboración con las principales productoras de eventos para ofrecerte una amplia selección de eventos
          </p>
        </div>

        <div className="p-8 flex flex-col justify-center w-96 h-80 rounded-md bg-slate-900 card group">
          <h3 className="font-bold text-4xl text-center leading-36 relative top-24 block group-hover:invisible leading-snug">
            Compra <br /> segura y fácil
          </h3>
          <p className="text-xl text-center leading-24 tracking-0 font-normal w-fit block mt-4 sm:mt-8 opacity-0 group-hover:opacity-100 relative bottom-6 sm:bottom-14">
            Puedes explorar los eventos, verificar la disponibilidad de tickets en tiempo real y realizar tu compra de manera rápida y sencilla. Garantizamos transacciones seguras para brindarte tranquilidad durante todo el proceso
          </p>
        </div>

        <div className="p-8 flex flex-col justify-center w-96 h-80 rounded-md bg-slate-900 card group">
          <h3 className="font-bold text-4xl text-center leading-36 relative top-16 block group-hover:invisible leading-snug">
            Experiencia premium
          </h3>
          <p className="text-xl text-center leading-24 tracking-0 font-normal w-fit block mt-4 sm:mt-8 opacity-0 group-hover:opacity-100 relative bottom-6 sm:bottom-14">
            Queremos que tu experiencia sea inolvidable desde el momento en que compras tu ticket hasta que vives el evento. Trabajamos para ofrecerte un servicio excepcional
          </p>
        </div>
      </div>
    </div>

            {/* nosotros */}
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-16">
                    {nosotros.map((compañero) => (
                        <div
                            className="m-8 w-4/5 bg-secondary border border-secondaryBorder shadow-md rounded-2xl "
                            key={compañero.id}
                        >
                            <img
                                className="w-5/6 m-8 rounded-full mx-auto transition-all duration-300 hover:rounded-lg"
                                src={compañero.foto}
                                alt={compañero.nombre}
                            />
                            <h3 className="text-2xl uppercase text-white font-semibold text-center mb-4">
                                {compañero.nombre}
                            </h3>
                            <p className="text-gray-200 text-center ">
                                {compañero.correo}
                            </p>
                            <p className="text-gray-200 text-center mb-6 ">
                                {compañero.telefono}
                            </p>

                            <div className="flex justify-center mb-8">
                                <p className="flex items-center mx-6">
                                    <a
                                        className="inline-flex items-center text-white hover:text-blue-600"
                                        href={compañero.github}
                                    >
                                        <FaGithub className="mr-2 text-3xl" />
                                    </a>
                                </p>
                                <p className="flex items-center mx-6">
                                    <a
                                        className="inline-flex items-center text-white hover:text-blue-600"
                                        href={compañero.linkedin}
                                    >
                                        <FaLinkedin className="mr-2 text-3xl" />
                                    </a>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

         
        </div>
    );
};

export default About;
