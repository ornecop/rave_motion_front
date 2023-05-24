import React, { useEffect } from "react";
import jwt_decode from "jwt-decode" 
import { signInGoogle } from "../../redux/actions/usersActions";
import { useDispatch } from "react-redux";
function GoogleAuthComponent() {
const dispatch= useDispatch()
  function handleCallbackResponse (response){
    const userObject= jwt_decode(response.credential)
  
    const { given_name: name, family_name: lastname, email: mail } = userObject;
    const extractedData = { name, lastname, mail };
    dispatch(signInGoogle(extractedData))
      }
 
  useEffect(() => {
google.accounts.id.initialize({
  client_id:"255049858573-qm7dl82tt6j3bj837067gb83snm2ihup.apps.googleusercontent.com",
  callback: handleCallbackResponse
})
google.accounts.id.renderButton(
  document.getElementById("signInDiv"),
  {theme:"outline",size:"large"},
)
  }, []);

  return (
    <div>

        <div id="signInDiv"></div>
      
    </div>
)}

export default GoogleAuthComponent;