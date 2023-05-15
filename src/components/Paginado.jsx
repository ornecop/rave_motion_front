import React from 'react'

export default function Paginado({ eventsPerPage, allEventos, paginado, currentPage }) {
    const pageNumber = [];
    const totalPages = Math.ceil(allEventos / eventsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumber.push(i);
    }
  
    return (
      <div className='flex justify-center mt-5'>
        <nav>
          <ul className="flex space-x-2 w-fit justify-self-end justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder ">
            {pageNumber.length > 1 && (
              <li className="hover:font-semibold focus:outline-none transition-colors duration-300 disabled:opacity-50 hover:text-fuchsia-600">
                <button
                  className=""
                  onClick={()=>{paginado(currentPage-1)}}
                  disabled={currentPage===1}
                >
                  &#60;&#60;
                </button>
              </li>
            )}
  
            {pageNumber.map((number) => (
              <li className="hover:font-semibold focus:outline-none transition-colors duration-300 disabled:opacity-50 hover:text-fuchsia-600" key={number}>
                <button className="" onClick={() => paginado(number)}>
                  {number}
                </button>
              </li>
            ))}
  
            {pageNumber.length > 1 && (
              <li className="">
                
                <button
                  className="hover:font-semibold focus:outline-none transition-colors duration-300 disabled:opacity-50 hover:text-fuchsia-600"
                  onClick={()=>{paginado(currentPage+1)}}
                  disabled={currentPage===pageNumber.length}
                >
                  &#62;&#62;
                </button>
            
              </li>
            )}
          </ul>
        </nav>
        
      </div>
      
    );
  }
  