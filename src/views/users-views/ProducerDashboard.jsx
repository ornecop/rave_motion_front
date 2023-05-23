import React, { useState } from 'react';
import { signout } from "../../redux/actions/usersActions";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 


      //? importar view \\
import DashboardCard from './DashboardCard'
import PasswordChange from './ChangePassword';
import EventCart from "../events-tickets-views/EventCart";
import EventCreate from "../events-views/EventCreate";
import EventTicketsCreate from "../events-views/EventCreate";
import ProducerEventDetail from "../users-views/ProducerEventDetail";   
    /* =======================================================
    VIEW ProducerDashboard - "/dashboard" - Vista para producers

    styles:
    listado de events con acciones (edit, remove, detail)

    * editar lleva a /create con los campos actuales en props
    * remove hace borrado logico con el backend
    * detail lleva a "/dashboard/:eventName"
    
*/


const ProducerDashboard = () => {
 
   //? select view\\
   const [selectedView, setSelectedView] = useState(false);
   const handleViewClick = (viewName) => {
      setSelectedView(viewName);
    };
   //? login\\
   const isLogin = useSelector(state => state.isLogin)

   //? dropdown\\
   const [open, setOpen] = useState(false)
 

   const handleSignOut = () => {
      isLogin && signout();
      navigate("/");
  };
  
 


    //! views en del User!\\
 const renderContent = () => {
   switch (selectedView) {
     case 'changepassword':
       return <div><PasswordChange/></div>;
     case 'cart':
       return <div><EventCart/></div>;
     case 'ProducerEventDetail':
       return <div><ProducerEventDetail/></div>;
     case 'EventTicketsCreate':
       return <div><EventCreate /></div>;
     case 'DashboardCard':
       return <div><DashboardCard/></div>;
     case 'deleteEvent':
         return <div> <h1>eliminaaaaar evento</h1> </div>;
     default:
       return <div><DashboardCard/></div>;
   }
 };



  return (
    <div className="flex mt-14 ">
     
    <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
    </button>


   <aside id="cta-button-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-14 border-r-2 border-secondary  " aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-primary ">
       <ul className="space-y-2 font-medium mt-6 ">

       <li>
            <Link className={`flex items-center p-2 text-white rounded-lg  hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${open == true? "bg-secondary": ""}`} >
               <svg className="h-6 w-6 text-white "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
               <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
               <span className="flex-1 ml-3 whitespace-nowrap" onClick={()=> setOpen(!open)}>Usuario </span>
            </Link>
            <div className={`${!open && "hidden"} `}>
               <div >

                  <div className= {`ml-14 mb-1 mt-1 p-2 text-sm hover:text-base rounded-lg transition duration-1000 ease-out  hover:bg-secondary ${selectedView == "changepassword"? "bg-secondary": ""}`} >
                     <Link onClick={() => handleViewClick('changepassword')} className={` `}>
                     <svg className="h-6 w-6 text-white inline" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinejoin="round"  >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                     </svg>
                     <span className="flex-1 ml-3 whitespace-nowrap">Contraseña</span>
                     </Link>
                  </div>

                  <div className={`ml-14 mb-5 p-2 text-sm hover:text-base rounded-lg  hover:bg-secondary transition duration-1000 ease-out ${selectedView == "cart"? "bg-secondary": ""}`}>
                     <Link onClick={() => handleViewClick('cart')}>
                  <svg className="h-6 w-6 text-white inline" width="24" height="24" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="9" cy="21" r="1" />  <circle cx="20" cy="21" r="1" />  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                     <span className="flex-1 ml-3 whitespace-nowrap ">Carrito</span>
                     </Link> 
                  </div>
            </div>
            </div>
            
         </li>

         <li>
            <Link className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${selectedView == "DashboardCard"? "bg-secondary": ""}`} onClick={() => handleViewClick('DashboardCard')}>
               <svg aria-hidden="true" className="w-6 h-6  text-white transition duration-75  group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3">Dashboard</span>
            </Link>
         </li>

         <li>
            <Link href="#" className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-secondary  hover:text-xl transition duration-1000 ease-out ${selectedView == "ProducerEventDetail"? "bg-secondary": ""}`} 
            onClick={() => handleViewClick('ProducerEventDetail')}>

               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white transition duration-75  group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap text-whit ">Detalle Evento</span>
            </Link>
         </li>

         <li>
            <Link className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${selectedView == "EventTicketsCreate"? "bg-secondary": ""}`}
               onClick={() => handleViewClick('EventTicketsCreate')}>

               <svg className="h-6 w-6 text-white "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />  <polyline points="12 8 7 3 3 7 8 12" />  <line x1="7" y1="8" x2="5.5" y2="9.5" />  <polyline points="16 12 21 17 17 21 12 16" />  <line x1="16" y1="17" x2="14.5" y2="18.5" /></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Editar Evento</span>
            </Link>
         </li>
         <li>
            <Link className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${selectedView == "deleteEvent"? "bg-secondary": ""}`}
             onClick={() => handleViewClick('deleteEvent')}>
            <svg className="h-6 w-6 text-white"  width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Eliminar Evento</span>
            </Link>
         </li>
      
         <li>
            <Link to={"/"} className={`flex items-center p-2 text-white rounded-lg  hover:bg-secondary hover:text-xl `}>
               <svg className="h-6 w-6 text-white "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
               </svg>
               <botton className="flex-1 ml-3 whitespace-nowrap" onClick={handleSignOut} >Cerrar sesión</botton>
            </Link>
         </li>
      </ul>
      
   </div>
</aside>

   <div className="p-4 sm:ml-64 w-11/12">
       {renderContent()}
   </div>

</div>
  );
};

export default ProducerDashboard;