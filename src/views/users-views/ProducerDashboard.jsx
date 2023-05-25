import React, { useState } from 'react';
import { signout } from "../../redux/actions/usersActions";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { HiUser, HiUserCircle, HiKey, HiArrowLeftCircle, HiTableCells, HiSquaresPlus,} from "react-icons/hi2";
import { BiEditAlt, BiTrash} from "react-icons/bi";

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
     case 'perfil':
       return <div><h1>Perfil</h1></div>;
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
            <HiUser className='h-6 w-6 inline'/> 
            <span className="flex-1 ml-3 whitespace-nowrap" onClick={()=> setOpen(!open)}>Usuario </span>
            </Link>
            <div className={`${!open && "hidden"} `}>
               <div >

               <div className={`ml-14 mb-1 mt-1 p-2 text-sm hover:text-base rounded-lg  hover:bg-secondary transition duration-1000 ease-out ${selectedView == "cart"? "bg-secondary": ""}`}>
                     <Link onClick={() => handleViewClick('perfil')}>
                     <HiUserCircle className='h-6 w-6 inline'/>
                     <span className="flex-1 ml-3 whitespace-nowrap ">Perfil</span>
                     </Link> 
                  </div>

               <div className= {`ml-14 mb-5 p-2 text-sm hover:text-base rounded-lg transition duration-1000 ease-out  hover:bg-secondary ${selectedView == "changepassword"? "bg-secondary": ""}`} >
                     <Link onClick={() => handleViewClick('changepassword')} className={` `}>
                     <HiKey className='h-6 w-6 inline' />
                     <span className="flex-1 ml-3 whitespace-nowrap">Contraseña</span>
                     </Link>
               </div>
                 
            </div>
            </div>
            
         </li>

         <li>
            <Link className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${selectedView == "DashboardCard"? "bg-secondary": ""}`} onClick={() => handleViewClick('DashboardCard')}>
              <HiTableCells className='h-6 w-6 inline' />
               <span className="ml-3">Dashboard</span>
            </Link>
         </li>

         <li>
            <Link href="#" className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-secondary  hover:text-xl transition duration-1000 ease-out ${selectedView == "ProducerEventDetail"? "bg-secondary": ""}`} 
            onClick={() => handleViewClick('ProducerEventDetail')}>
            <HiSquaresPlus className='h-6 w-6 inline' />
               <span className="flex-1 ml-3 whitespace-nowrap text-whit ">Detalle Evento</span>
            </Link>
         </li>

         <li>
            <Link className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${selectedView == "EventTicketsCreate"? "bg-secondary": ""}`}
               onClick={() => handleViewClick('EventTicketsCreate')}>
               <BiEditAlt className='h-6 w-6 inline' />
               <span className="flex-1 ml-3 whitespace-nowrap">Editar Evento</span>
            </Link>
         </li>
         <li>
            <Link className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${selectedView == "deleteEvent"? "bg-secondary": ""}`}
             onClick={() => handleViewClick('deleteEvent')}>
          <BiTrash className='h-6 w-6 inline'/>
               <span className="flex-1 ml-3 whitespace-nowrap">Eliminar Evento</span>
            </Link>
         </li>
      
         <li>
            <Link to={"/"} className={`flex items-center p-2 text-white rounded-lg  hover:bg-secondary hover:text-xl `}>
               <HiArrowLeftCircle className='h-6 w-6 inline' />
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