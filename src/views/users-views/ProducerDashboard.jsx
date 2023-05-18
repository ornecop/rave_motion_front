import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from "../../redux/actions/usersActions";
import { useSelector } from 'react-redux';
    /* =======================================================
    VIEW ProducerDashboard - "/dashboard" - Vista para producers

    styles:
    listado de events con acciones (edit, remove, detail)

    * editar lleva a /create con los campos actuales en props
    * remove hace borrado logico con el backend
    * detail lleva a "/dashboard/:eventName"
    
*/


const ProducerDashboard = () => {

   const isLogin = useSelector(state => state.isLogin)

   const handleSignOut = () => {
      isLogin && signout();
      navigate("/");
  };
    

  return (
    <div className="flex mt-14">
    
    <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
    </button>

<aside id="cta-button-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-14" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-primary dark:bg-gray-800">
      <ul class="space-y-2 font-medium ">
         <li>
            <a href="#" class="flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl ">
               <svg aria-hidden="true" class="w-6 h-6  text-white transition duration-75  group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span class="ml-3">Dashboard</span>
            </a>
         </li>
         <li>
            <a href="/dashboard/:eventId" class="flex items-center p-2 rounded-lg dark:text-white hover:bg-secondary  hover:text-xl">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75  group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-whit ">Detalle Evento</span>
            </a>
         </li>
         <li>
            <a href="/create/tickets/:eventId/" class="flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl">
               <svg class="h-6 w-6 text-white "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />  <polyline points="12 8 7 3 3 7 8 12" />  <line x1="7" y1="8" x2="5.5" y2="9.5" />  <polyline points="16 12 21 17 17 21 12 16" />  <line x1="16" y1="17" x2="14.5" y2="18.5" /></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Editar Evento</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl">
            <svg class="h-6 w-6 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Eliminar Evento</span>
            </a>
         </li>

         <li>
            <a href="#" class="flex items-center p-2 text-white rounded-lg  hover:bg-secondary hover:text-xl">
               <svg class="h-6 w-6 text-white "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Usuario</span>
            </a>
         </li>
      
         <li>
            <a href="/" class="flex items-center p-2 text-white rounded-lg  hover:bg-secondary hover:text-xl ">
               <svg class="h-6 w-6 text-white "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
               </svg>
               <botton class="flex-1 ml-3 whitespace-nowrap" onClick={handleSignOut} >Cerrar sesión</botton>
            </a>
         </li>
      </ul>
      
   </div>
</aside>

<div class="p-4 sm:ml-64">
   
</div>

  </div>
  );
};

export default ProducerDashboard;