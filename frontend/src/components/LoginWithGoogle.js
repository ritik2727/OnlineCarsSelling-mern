import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { googlelogin } from "../actions/userActions";
import GoogleButton from 'react-google-button'

import "../StylesUI.css"

export default function LoginWithGoogle() {
  const dispatch = useDispatch();
  const responseGoogle = async (response) => {
    let auth_token = response.tokenId;
    console.log("res", response.tokenId);
    dispatch(googlelogin(auth_token))

    // let res = await axios.post("/api/users/social_auth/google", {
    //   tokenId: auth_token,
    // });
    // console.log("auth_token", res.data);
  };
  return (
    <div className="App">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        // buttonText="Sign In with Google"
        render={renderProps => (
          <buttond onClick={renderProps.onClick} ><GoogleButton /></buttond>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
