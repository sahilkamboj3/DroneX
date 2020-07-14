import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Cookie from "js-cookie";

import styles from "../styles/changename.module.scss";

const ChangeName = () => {
  const [name, setName] = useState("");
  const isLogged = useSelector((state) => state.isLoggedReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nameError = document.getElementById("nameError");
    nameError.textContent = "";

    if (name == "") {
      nameError.textContent = "Please enter a name.";
    } else {
      const jwt = JSON.parse(Cookie.get("jwt"));
      const bearer = `Bearer ${jwt}`;

      await fetch("http://localhost:8000/api/changename/", {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
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
        <title>Change Name</title>
      </head>
      <div id="side-image" className={styles.side_image}>
        <img src={"../images/name.svg"} className={styles.image} alt="" />
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <img src={"../images/logo.jpg"} className={styles.logo} alt="" />
        <label>Please enter your new name: </label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name..."
          className={styles.input}
        />
        <p id="nameError" className={styles.errors}></p>
        <button type="submit" className={styles.button}>
          Change Name
        </button>
        <button
          className={styles.button}
          onClick={() => Router.push("/profile")}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default ChangeName;
