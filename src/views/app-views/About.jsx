/* =======================================================
VIEW About - "/about" - 

styles:
*/
// Hooks
import { useState } from "react";

// Assets
import { FaLinkedin, FaGithub } from "react-icons/fa";

// Paginado va¿?
import Paginado from "../../components/Paginado";

const About = () => {
    const allEventos = [
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
    // const [order, setOrder] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(3);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = allEventos.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full min-h-screen">
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-16">
                    {currentEvents.map((compañero) => (
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

            <Paginado
                eventsPerPage={eventsPerPage}
                allEventos={allEventos.length}
                paginado={paginado}
            />
        </div>
    );
};

export default About;
