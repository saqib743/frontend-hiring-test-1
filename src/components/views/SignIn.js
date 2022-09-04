import { withStyles } from "@mui/styles";
import styles from "../../resources/styles/helpers-styles/SignIn";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/auth/auth";
import loader from "../../resources/design-images/loader.gif";
function SignIn(props) {
  const { classes } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.labelRow}>User Name</div>
          <div className={classes.inputRow}>
            <input
              className={classes.input}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.labelRow}>Password</div>
          <div className={classes.inputRow}>
            <input
              className={classes.input}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.inputRow}></div>
          {!auth.loading ? (
            <div
              className={classes.btn}
              onClick={() => {
                dispatch(authenticateUser(username, password));
              }}
            >
              Login
            </div>
          ) : (
            <img src={loader} alt="loader" width="30px" />
          )}
        </div>
      </div>
    </div>
  );
}
export default withStyles(styles)(SignIn);
