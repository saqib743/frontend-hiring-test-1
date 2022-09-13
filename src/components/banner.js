import { withStyles } from "@mui/styles";
import styles from "../resources/styles/views-styles/Banner";
import React from "react";
import logo from "../resources/design-files/TT Logo.png";
import { useSelector } from "react-redux";

function Banner(props) {
  const { classes } = props;
  const auth = useSelector((state) => state.auth);
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={logo} alt="Turing Technologies" width="250px" />
      </div>
      {auth.loggedIn ? (
        <div className={classes.SignoutContainer}>
          <a href="/" className={classes.btn}>
            Log out
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default withStyles(styles)(Banner);
