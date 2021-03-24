import React from "react";
import { useSelector } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import "./footer.styles.scss";

const Footer = () => {
  const { uid } = useSelector((state) => state.firebase.auth);
  return (
    <div className="footer">
      Made by Joe
      {uid ? (
        <div className="nav-link" onClick={() => auth.signOut()}>
          Sign Out
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
