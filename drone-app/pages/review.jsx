import Nav from "./Nav";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import Router from "next/router";

import styles from "../styles/review.module.scss";

const Review = () => {
  let Filter = require("bad-words");
  let filter = new Filter();

  const [review, setReview] = useState("");
  const [image, setImage] = useState();
  const [checked, setChecked] = useState(false);
  const isLogged = useSelector((state) => state.isLoggedReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const ratingEl = document.getElementById("starRating");
    const rating = ratingEl.options[ratingEl.selectedIndex].value;

    const reviewData = new FormData();
    reviewData.append("rating", rating);
    reviewData.append("review", filter.clean(review));
    reviewData.append("isAnonymous", checked);

    if (image != null) {
      reviewData.append("image", image, image.name);
    }

    const jwt = JSON.parse(Cookie.get("jwt"));
    const bearer = `Bearer ${jwt}`;

    fetch("http://localhost:8000/api/post/review/", {
      method: "POST",
      headers: { Authorization: bearer },
      body: reviewData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setReview("");
    Router.push("/product");
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Review</title>
      </head>
      <Nav />
      <div className={styles.content}>
        <div className={styles.side_image}>
          <img src={"../images/review.svg"} className={styles.image} alt="" />
        </div>
        <div className={styles.form_div}>
          <form onSubmit={onSubmit} className={styles.form}>
            <h2>Review</h2>
            <textarea
              className={styles.input}
              type="text"
              placeholder="Review..."
              value={review}
              onChange={handleReviewChange}
              rows="10"
            />
            <br />
            <div className={styles.rating}>
              <img src={"../images/star.jpg"} className={styles.star} alt="" />{" "}
              <select
                name="starRating"
                id="starRating"
                className={styles.select}
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <label>
              Want to post anonymously?
              <input
                type="checkbox"
                name="postAnonymously"
                id="postAnonymously"
                defaultChecked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </label>
            <br />
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleImageChange}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button
              onClick={() => Router.push("/product")}
              className={styles.button}
            >
              Go back
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Review;
