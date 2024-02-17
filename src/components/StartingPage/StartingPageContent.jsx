import classes from "./StartingPageContent.module.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
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
      <h1>Welcome on Board!</h1>
    </section>
  );
};

export default StartingPageContent;
