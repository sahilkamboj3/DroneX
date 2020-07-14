import Router from "next/router";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "../styles/changeprofileimage.module.scss";

const ChangeUserName = () => {
  const [image, setImage] = useState();
  const isLogged = useSelector((state) => state.isLoggedReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const imageError = document.getElementById("imageError");
    imageError.textContent = "";

    const jwt = JSON.parse(Cookie.get("jwt"));
    const bearer = `Bearer ${jwt}`;
    const formData = new FormData();

    if (image != null) {
      formData.append("image", image, image.name);
    } else {
      imageError.textContent = "Please pick an image";
      return;
    }

    await fetch("http://localhost:8000/api/changeprofileimage/", {
      method: "POST",
      headers: { Authorization: bearer },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    Router.push("/profile");
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Change Profile Image</title>
      </head>
      <div className={styles.side_image}>
        <img
          src={"../images/profile_image.svg"}
          className={styles.image}
          alt=""
        />
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <img src={"../images/logo.jpg"} className={styles.logo} alt="" />
        <label>Pick your new profile image: </label>
        <input
          className={styles.input}
          type="file"
          onChange={handleImageChange}
        />
        <p id="imageError" className={styles.errors}></p>
        <button className={styles.button} type="submit">
          Change Profile Image
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

export default ChangeUserName;
