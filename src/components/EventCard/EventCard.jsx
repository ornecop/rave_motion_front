import { Link } from "react-router-dom";

export const EventCard =({name, image, description, date, venue, hour })=>{

    const handleAddToCart = () => {
        onAddToCart();
      };

    return ( 
        <div className="flex font-sans mx-3 my-2 ">

    
        <div className="flex-none w-48 relative ">
          <Link to="/event/:eventName">   
          <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover rounded-l-lg " loading="lazy" />
          </Link> 
        </div>
   

  <form className="flex-auto p-6  bg-white rounded-r-lg">

    <Link to="/event/:eventName">
          <div className="flex flex-wrap" >
            <h1 className="flex-auto text-lg font-semibold text-slate-900">
              {name}
            </h1>
            <div className="text-lg font-semibold text-slate-500">
              $110.00
            </div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
              {description}
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm">
            
                <div className="mr-6 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                  📆 {date}
                </div>
                <div className=" h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                ⌚{hour}
                </div>
            </div>
          </div>
    </Link>
    
    <div className="flex space-x-4 mb-6 text-sm font-medium">
      <div className="flex-auto flex space-x-4">
        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:shadow-lg shadow-black/40 " type="submit">
          Buy now
        </button>
        <button className="h-10 px-6 font-semibold text-lg rounded-md border border-slate-200 text-slate-900 hover:shadow-lg shadow-indigo-500/40 " type="button" onClick={handleAddToCart}>
          🛒
        </button>
      </div>
      <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md hover:shadow-lg shadow-indigo-500/40 text-slate-300 border border-slate-200 hover:text-red-400" type="button" aria-label="Like">
        <svg width="20" height="20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </button>
    </div>
    <p className="text-sm text-slate-700">
     {venue}
    </p>
  </form>
  
</div>
        
    )
}
export default EventCard;


