import React from "react";
import { useState } from "react";

/* =======================================================
    VIEW About - "/about" - 

    styles:
    

*/
import Paginado from '../../components/Paginado'
const About = () => {
    
    const allEvents = [
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
            nombre: "Yonatan Llanto",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+51 918 199 369",
            github: "https://github.com/juanperez",
            linkedin: "https://www.linkedin.com/in/juanperez/",
        },
        {
            id: 8,
            nombre: "Ornella Copula",
            foto: "https://tienda.fotografiamardelplata.com.ar/wp-content/webpc-passthru.php?src=https://tienda.fotografiamardelplata.com.ar/wp-content/uploads/2022/03/Gimena-3-2048.jpg&nocache=1",
            correo: "mail@gmail.com",
            telefono: "+54 9 351 392-8047",
            github: "https://github.com/juanperez",
            linkedin: "https://www.linkedin.com/in/juanperez/",
        },
        
    ];
    // const [order, setOrder] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    const [eventsPerPage] = useState(3)
    const indexOfLastDog = currentPage * eventsPerPage
    const indexOfFirstDog = indexOfLastDog - eventsPerPage
    const currentEvents = allEvents.slice(indexOfFirstDog, indexOfLastDog)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div className="w-full h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-16">
                {currentEvents.map((compañero) => (
                    <div
                        className="m-8 w-4/5 bg-secondary border border-secondaryBorder shadow-md rounded-2xl "
                        key={compañero.id}
                    >
                        <img
                            className="w-5/6 m-8 rounded-full  mx-auto"
                            src={compañero.foto}
                            alt={compañero.nombre}
                        />
                        <h3 className="text-lg text-blue-500 font-semibold">
                            {compañero.nombre}
                        </h3>
                        <p className="text-gray-600 mb-2">{compañero.correo}</p>
                        <p className="text-gray-600 mb-4">
                            {compañero.telefono}
                        </p>
                        <p>
                            <a
                                className="text-blue-500 hover:text-blue-600"
                                href={compañero.github}
                            >
                                Github
                            </a>
                        </p>
                        <p>
                            <a
                                className="text-blue-500 hover:text-blue-600"
                                href={compañero.linkedin}
                            >
                                LinkedIn
                            </a>
                        </p>
                    </div>
                ))}
                   

            </div>
            <Paginado eventsPerPage={eventsPerPage} allEvents={allEvents.length} paginado={paginado}/>
        </div>
        
    );
};

export default About;
