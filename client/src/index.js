import React from 'react';
import ReactDOM from 'react-dom';
// import { Auth0Provider } from '@auth0/auth0-react'

import App from './App';
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <Router>
  {/* <Auth0Provider 
    domain="dev-k1jnfnjw2upmgpmd.us.auth0.com"
    clientId="YLDzVIOEo1AltnWLEgytEBKvVGPzcQMv"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://hhh/api/",
      scope: "read:current_user update:current_user_metadata"
    }}
    > */}
    <App />
    {/* </Auth0Provider>, */}
  </Router>,

  document.getElementById('root')
);
