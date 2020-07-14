import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import LoginAction from "../store/actions/LoginAction";
import Cookie from "js-cookie";

import styles from "../styles/signin.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const login = () => dispatch(LoginAction());

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const getToken = () => {
    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Cookie.set("jwt", JSON.stringify(data["access"]));
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const loginError = document.getElementById("loginError");
    loginError.textContent = "";

    fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["message"] == "Logged in.") {
          login();
          getToken();
          Router.push("/product");
        } else if (data["message"] == "User invalid.") {
          loginError.textContent = "Email/password is invalid.";
        } else {
          loginError.textContent = "Server error. Please try again.";
        }
      });
  };

  const changePasswordType = () => {
    const password = document.getElementById("password");
    if (password["type"] == "password") {
      password["type"] = "input";
    } else {
      password["type"] = "password";
    }
  };

  return (
    <div>
      <header>
        <title>DroneX | Login</title>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.div2}>
          <img src={"/images/logo.jpg"} alt="Logo" className={styles.image} />
          <h1>Login</h1>
          <form onSubmit={onSubmit} className={styles.form}>
            <input
              type="email"
              required="required"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
            />
            <input
              type="password"
              required="required"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
              id="password"
            />
            <div className={styles.password_visibility}>
              <p>See password?</p>
              <img
                src={"../images/show_password.png"}
                className={styles.password_image}
                onClick={changePasswordType}
                alt=""
              />
            </div>

            <button type="submit" className={styles.button}>
              Log in
            </button>
          </form>
          <p id="loginError" className={styles.errors}></p>
          <div>
            <Link href="/">
              <a className={styles.help_text}>
                <strong>Sign up.</strong>
              </a>
            </Link>
            {" | "}
            <Link href="/forgotpassword">
              <a className={styles.help_text}>Forgot password?</a>
            </Link>
          </div>
          <p>
            Sign in to access your very own <br />
            DroneX <strong>Deals</strong> and <strong>Discounts</strong>.
          </p>
        </div>
        <div id="side image" className={styles.div1}>
          <img
            src={"../images/sign_side_2.svg"}
            className={styles.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
