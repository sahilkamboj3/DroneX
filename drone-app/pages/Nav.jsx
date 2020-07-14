import { useDispatch } from "react-redux";
import LogoutAction from "../store/actions/LogoutAction";
import Router from "next/router";
import Cookie from "js-cookie";
import ZeroAction from "../store/actions/ZeroAction";

import styles from "../styles/nav.module.scss";

const Nav = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookie.remove("jwt");
    dispatch(ZeroAction());
    dispatch(LogoutAction());
    Router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <img
        src={"../images/logo.png"}
        alt=""
        className={styles.logo}
        onClick={() => Router.push("/product")}
      />
      <div className={styles.button_div}>
        <button
          onClick={() => Router.push("/product")}
          className={styles.button}
        >
          Shop
        </button>
        <button
          onClick={() => Router.push("/profile")}
          className={styles.button}
        >
          Profile
        </button>
        <button onClick={handleLogout} className={styles.signout}>
          Sign out
        </button>
      </div>
      <img
        src={"../images/cart.jpg"}
        className={styles.image}
        onClick={() => Router.push("/cart")}
        alt=""
      />
      <img
        src={"../images/profile_icon.png"}
        alt=""
        className={styles.profile_icon}
        onClick={() => Router.push("/profile")}
      />
    </div>
  );
};

export default Nav;
