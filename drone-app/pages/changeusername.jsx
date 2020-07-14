import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Cookie from "js-cookie";

import styles from "../styles/changeusername.module.scss";

const ChangeUserName = () => {
  const [username, setUserName] = useState("");
  const isLogged = useSelector((state) => state.isLoggedReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const usernameError = document.getElementById("usernameError");
    usernameError.textContent = "";

    if (username == "") {
      usernameError.textContent = "Please enter a username.";
    } else {
      const jwt = JSON.parse(Cookie.get("jwt"));
      const bearer = `Bearer ${jwt}`;

      fetch("http://localhost:8000/api/changeusername/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: bearer },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      Router.push("/profile");
    }
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Change Username</title>
      </head>
      <div id="side-image" className={styles.side_image}>
        <img src={"../images/username.svg"} className={styles.image} alt="" />
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <img src={"../images/logo.jpg"} className={styles.logo} alt="" />
        <label>Please enter your new username:</label>
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={handleUserNameChange}
          placeholder="Username..."
        />
        <p id="usernameError" className={styles.errors}></p>
        <button type="submit" className={styles.button}>
          Change Username
        </button>
        <button
          onClick={() => Router.push("/profile")}
          className={styles.button}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default ChangeUserName;
