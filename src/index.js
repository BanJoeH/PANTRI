import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-notifications-component/dist/theme.css";
import App from "./App";
import store from "./App/store";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter as Router } from "react-router-dom";
import { rrfProps } from "./firebase/firebase.utils";
import MenuProvider from "react-flexible-sliding-menu";
import SlideMenu from "./components/slide-menu/slide-menu.component";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <MenuProvider MenuComponent={SlideMenu}>
            <App />
          </MenuProvider>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
