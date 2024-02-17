import { useState, useRef, useContext } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./AuthForm.module.css";
import { AuthContext } from "../../store/AuthContext";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [sending, setSending] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSending(true);
    if (isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQB6v7juLB1ZeieXByybdGUu0tfcnknbs",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          authCtx.Login(data.idToken);
          localStorage.setItem("user", data.idToken);
          setSending(false);
          notify("successfully signed in");
          history.replace("/");
        } else {
          const data = await response.json();
          setSending(false);
          notify(data.error.message);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQB6v7juLB1ZeieXByybdGUu0tfcnknbs",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
          }
        );

        if (response.ok) {
          setSending(false);
          notify("Account Created 😉");
        } else {
          const data = await response.json();
          setSending(false);
          notify(data.error.message);
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {sending ? (
            <span>Sending Request...</span>
          ) : (
            <>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              <button>{isLogin ? "Login" : "Create Account"}</button>
            </>
          )}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
