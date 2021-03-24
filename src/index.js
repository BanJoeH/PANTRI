import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-notifications-component/dist/theme.css";
import App from "./App";
import store from "./App/store";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";
import { rrfProps } from "./firebase/firebase.utils";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
