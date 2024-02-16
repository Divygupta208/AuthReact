import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../../store/AuthContext";

const ProfileForm = () => {
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const passwordChangeHandler = async (event) => {
    event.preventDefault();

    const enteredPassword = passwordRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBQB6v7juLB1ZeieXByybdGUu0tfcnknbs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: true,
        }),

        headers: { "Content-Type": "application/json" },
      }
    ).then();
  };

  return (
    <form className={classes.form} onSubmit={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
