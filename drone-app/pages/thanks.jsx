import Router from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "../styles/thankyou.module.scss";

const Thankyou = () => {
  const isLogged = useSelector((state) => state.isLoggedReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Thank You</title>
      </head>
      <div className={styles.content}>
        <img src={"../images/logo.jpg"} className={styles.logo} alt="" />
        <div className={styles.text}>
          <h1>Thank you</h1>
          <h3>Want to share the product? Click below!</h3>
          <div className={styles.social_icons}>
            <img
              src={"../images/gmail.png"}
              onClick={() => window.open("https://www.gmail.com", "_blank")}
              className={styles.image}
              alt=""
            />
            {/* <img
              src={"../images/twitter.png"}
              onClick={() => window.open("https://www.twitter.com", "_blank")}
              className={styles.image}
              alt=""
            />
            <img
              src={"../images/instagram.jpg"}
              onClick={() => window.open("https://www.instagram.com", "_blank")}
              className={styles.image}
              alt=""
            />
            <img
              src={"../images/facebook.png"}
              onClick={() => window.open("https://www.facebook.com", "_blank")}
              className={styles.image}
              alt=""
            /> */}
          </div>
          <p>
            You are a valued customer and we appreciate your time and money! We
            hope you enjoy our drones and more!
          </p>

          <p>
            P.S - Look for an email from <strong> dronex327@gmail.com</strong>
          </p>
        </div>
        <button
          onClick={() => Router.push("/product")}
          className={styles.button_back}
        >
          Back to product page
        </button>
      </div>
      <div className={styles.side_image}>
        <img src={"../images/thankyou.svg"} className={styles.image} alt="" />
      </div>
    </div>
  );
};

export default Thankyou;
