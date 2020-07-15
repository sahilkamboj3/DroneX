import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import LoginAction from "../store/actions/LoginAction";
import Router from "next/router";
import Cookie from "js-cookie";

import styles from "../styles/signup.module.scss";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const login = () => dispatch(LoginAction());

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
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

    const signUpError = document.getElementById("signUpError");
    signUpError.textContent = "";

    fetch("http://localhost:8000/api/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        name: name,
        username: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Account created.") {
          login();
          getToken();
          Router.push("/product");
        } else if (data.message == "Unique attribute failed.") {
          signUpError.textContent =
            "User with email or username already exists.";
        } else {
          signUpError.textContent = "Server error. Please try again.";
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
        <title>DroneX | Signup</title>
      </header>
      <div className={styles.wrapper}>
        <div id="side-image" className={styles.div1}>
          <img
            src={"../images/create_account.svg"}
            className={styles.image}
            alt=""
          />
        </div>
        <div className={styles.div2}>
          <img src={"/images/logo.jpg"} alt="Logo" className={styles.image} />
          <h1>Getting Started</h1>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.input1}>
              <input
                type="text"
                required="required"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                className={styles.input}
              />
            </div>
            <input
              type="text"
              required="required"
              placeholder="Username"
              value={userName}
              onChange={handleUserNameChange}
              className={styles.input}
            />
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
              id="password"
              onChange={handlePasswordChange}
              className={styles.input}
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
              Sign up
            </button>
          </form>
          <p id="signUpError" className={styles.errors}></p>
          <Link href="/login">
            <a className={styles.help_text}>
              Have an account? <strong>Sign in.</strong>
            </a>
          </Link>
          <p>
            By signing up, you agree with DroneX's
            <br />
            <strong>
              <a
                className={styles.pages}
              >
                Term of Conditions
              </a>
            </strong>
            ,{" "}
            <strong>
              <a className={styles.pages}>
                Privacy Policy
              </a>
            </strong>
            ,<br /> and{" "}
            <strong>
              <a className={styles.pages}>
                Return Policy
              </a>
            </strong>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
