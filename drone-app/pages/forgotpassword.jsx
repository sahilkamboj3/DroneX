import Router from "next/router";
import { useState } from "react";

import styles from "../styles/forgotpassword.module.scss";

const forgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [code, setCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserCodeChange = (e) => {
    setUserCode(e.target.value);
  };

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const emailError = document.getElementById("emailError");
    emailError.textContent = "Please wait...";
    await fetch("http://localhost:8000/api/forgotpassword/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["message"] == "email sent") {
          setCode(data["code"]);
          setShowCodeInput(true);
          setShowEmailInput(false);
        } else if (data["message"] == "user doesn't exist") {
          emailError.textContent = "Email is incorrect or user doesn't exist.";
        }
      });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const userCodeError = document.getElementById("userCodeError");
    userCodeError.textContent = "Please wait...";
    if (userCode == code) {
      setUserCode("");
      setShowCodeInput(false);
      setShowPasswordInputs(true);
    } else {
      userCodeError.textContent = "Code in incorrect.";
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const passwordError = document.getElementById("passwordError");
    passwordError.textContent = "";
    if (password1 == "" && password2 == "") {
      passwordError.textContent = "Please enter values for your passwords.";
    } else if (password1 != password2) {
      passwordError.textContent = "Your passwords don't match.";
    } else {
      changePasswords();
    }
  };

  const changePasswords = async () => {
    const passwordError = document.getElementById("passwordError");
    passwordError.textContent = "";
    await fetch("http://localhost:8000/api/changepassword/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        newPassword: password1,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    const passwordChangeCongratulations = document.getElementById(
      "passwordChangeCongratulations"
    );
    passwordChangeCongratulations.textContent =
      "Congratulations, your password was changed. You will be redirected in just a moment so hang tight!";
    setTimeout(() => {
      Router.push("/login");
    }, 2000);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setShowEmailInput(true);
    setShowCodeInput(false);
    setShowPasswordInputs(false);
  };

  const changePasswordType = () => {
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");

    if (password1["type"] == "password") {
      password1["type"] = "input";
      password2["type"] = "input";
    } else {
      password1["type"] = "password";
      password2["type"] = "password";
    }
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Change Password</title>
      </head>
      <div className={styles.side_image}>
        <img
          src={"../images/forgotpassword.svg"}
          className={styles.image}
          alt=""
        />
      </div>
      <form id="forgotPasswordForm" className={styles.form}>
        <img src={"../images/logo.jpg"} className={styles.image} alt="" />
        {showEmailInput ? (
          <div className={styles.mini_form}>
            <label>Please type in your email.</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
            />
            <button
              className={styles.button}
              type="submit"
              onClick={handleEmailSubmit}
            >
              Forgot password
            </button>
            <p id="emailError" className={styles.error}></p>
          </div>
        ) : (
          ""
        )}
        {showCodeInput ? (
          <div className={styles.mini_form}>
            <label>Please enter the code emailed to you. </label>
            <input
              type="text"
              value={userCode}
              className={styles.input}
              onChange={handleUserCodeChange}
              placeholder="Enter your code"
            />
            <button
              type="submit"
              onClick={handleCodeSubmit}
              className={styles.button}
            >
              Submit
            </button>
            <p id="userCodeError" className={styles.error}></p>
          </div>
        ) : (
          ""
        )}
        {showPasswordInputs ? (
          <div className={styles.mini_form}>
            <input
              type="password"
              value={password1}
              onChange={handlePassword1Change}
              placeholder="Enter password"
              className={styles.input}
              id="password1"
            />
            <input
              type="password"
              value={password2}
              onChange={handlePassword2Change}
              placeholder="Confirm password"
              className={styles.input}
              id="password2"
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
            <button
              type="submit"
              onClick={handlePasswordSubmit}
              className={styles.button}
            >
              Change Password
            </button>
            <p id="passwordError" className={styles.error}></p>
            <p
              id="passwordChangeCongratulations"
              className={styles.congratulations}
            ></p>
          </div>
        ) : (
          ""
        )}
        <div className={styles.button_div}>
          <button onClick={resetForm} className={styles.button_reset}>
            Reset
          </button>
          <button
            onClick={() => Router.push("/login")}
            className={styles.button_back}
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};
export default forgotPassword;
