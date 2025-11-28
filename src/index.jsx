import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "react-notifications-component/dist/theme.css";
import App from "./App";
import store from "./App/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./components/modal/useModal";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter as Router } from "react-router-dom";
import { rrfProps } from "./firebase/firebase.utils";

import themeOptions from "./theme";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme(themeOptions);

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Router>
              <App />
            </Router>
          </ReactReduxFirebaseProvider>
        </Provider>
      </ThemeProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

serviceWorkerRegistration.register();
