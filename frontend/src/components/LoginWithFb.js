import React from "react";
// import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import { useDispatch } from "react-redux";
import { fblogin, googlelogin } from "../actions/userActions";
import GoogleButton from "react-google-button";
import { GrFacebook } from "react-icons/gr";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import "../StylesUI.css";

export default function LoginWithFb() {
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
    let auth_token = response.accessToken;
    let uid = response.userID;
    // console.log("res", response.tokenId);
    dispatch(fblogin(auth_token, uid));
  };
  return (
    <div className="App">
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_LOGIN}
        autoLoad={false}
        fields="name,email,picture"
        icon="fa-facebook"
        render={(renderProps) => (
          <div style={{}} onClick={renderProps.onClick}>
            <buttond
              type="button"
              style={{}}
              className="loginBtn loginBtn--facebook p-2 text-white flex items-center justify-around w-60"
            >
              <GrFacebook style={{height:'2.5em',width:'4.1em'}}/> Login with Facebook
            </buttond>
          </div>
        )}
        // onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  );
}
