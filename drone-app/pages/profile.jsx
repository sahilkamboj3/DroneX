import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Cookie from "js-cookie";
import Nav from "./Nav";
import Footer from "./Footer";

import styles from "../styles/profile.module.scss";

const User = () => {
  const isLogged = useSelector((state) => state.isLoggedReducer);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const minOrdersOnPage = 5;
  const [numOrdersOnPage, setNumOrdersOnPage] = useState(minOrdersOnPage);

  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const minReviewsOnPage = 5;
  const [numReviewsOnPage, setNumReviewsOnPage] = useState(minOrdersOnPage);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    } else {
      const jwt = JSON.parse(Cookie.get("jwt"));
      const bearer = `Bearer ${jwt}`;

      try {
        fetch("http://127.0.0.1:8000/api/profile/", {
          method: "POST",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setEmail(data["email"]);
            setName(data["name"]);
            setUsername(data["username"]);
            if (data["profileImage"] != null) {
              setProfileImage(data["profileImage"]);
            }
            if (data["orders"].length > 0) {
              console.log(data["orders"].reverse());
              setAllOrders(data["orders"].reverse());
              setOrders(data["orders"].reverse().slice(0, minOrdersOnPage));
            }
            if (data["reviews"].length > 0) {
              console.log(data["reviews"].reverse());
              setAllReviews(data["reviews"].reverse());
              setReviews(data["reviews"].reverse().slice(0, minReviewsOnPage));
            }
          });
      } catch (err) {
        console.log(err);
        Router.push("/product");
      }
    }
  }, []);

  const loadMoreOrders = () => {
    if (numOrdersOnPage + minOrdersOnPage >= allOrders.length) {
      setNumOrdersOnPage(allOrders.length);
    } else {
      setNumOrdersOnPage(numOrdersOnPage + minOrdersOnPage);
    }
  };

  const loadLessOrders = () => {
    if (numOrdersOnPage - minOrdersOnPage >= minOrdersOnPage) {
      setNumOrdersOnPage(numOrdersOnPage - minOrdersOnPage);
    } else {
      setNumOrdersOnPage(minOrdersOnPage);
    }
  };

  useEffect(() => {
    setOrders(allOrders.slice(0, numOrdersOnPage));
  }, [numOrdersOnPage]);

  const loadMoreReviews = () => {
    if (numReviewsOnPage + minReviewsOnPage >= allReviews.length) {
      setNumReviewsOnPage(allReviews.length);
    } else {
      setNumReviewsOnPage(numReviewsOnPage + minReviewsOnPage);
    }
  };

  const loadLessReviews = () => {
    if (numReviewsOnPage - minReviewsOnPage >= minReviewsOnPage) {
      setNumReviewsOnPage(numReviewsOnPage - minReviewsOnPage);
    } else {
      setNumReviewsOnPage(minReviewsOnPage);
    }
  };

  useEffect(() => {
    setReviews(allReviews.slice(0, numReviewsOnPage));
  }, [numReviewsOnPage]);

  const handleDelete = () => {
    const jwt = JSON.parse(Cookie.get("jwt"));
    const bearer = `Bearer ${jwt}`;
    fetch("http://localhost:8000/api/delete/profile/", {
      method: "DELETE",
      headers: { Authorization: bearer },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    Router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Profile</title>
      </head>
      <Nav />

      <div className={styles.profile}>
        <div className={styles.information}>
          {profileImage != null ? (
            <div className={styles.profile_image_div}>
              <img
                src={`http://localhost:8000${profileImage}`}
                className={styles.profile_image}
              />
            </div>
          ) : (
            <p>* Add a profile image.</p>
          )}
          <p className={styles.h1}>
            Hey {username}! <br />
          </p>
          <button
            onClick={() => Router.push("/changename")}
            className={styles.button1}
          >
            Change Name
          </button>
          <button
            onClick={() => Router.push("/changeusername")}
            className={styles.button1}
          >
            Change Username
          </button>
          <button
            onClick={() => Router.push("/changeprofileimage")}
            className={styles.button1}
          >
            Change Profile Image
          </button>
          <button onClick={handleDelete} className={styles.button1}>
            Delete Account
          </button>
        </div>
        <div className={styles.orders}>
          <h1>Your orders ({allOrders.length})</h1>
          <div>
            {orders.map((order) => {
              return (
                <div key={order[0]} className={styles.order}>
                  <div className={styles.text}>
                    <h3>{order[0]}</h3>
                    {/* <p>DroneX 5000</p> */}
                    <p>{order[1]} Drones</p>
                    <p>${order[2]}</p>
                    <p className={styles.arriving}>Arrived</p>
                  </div>
                </div>
              );
            })}
            {orders.length == 0 ? (
              <h3>Oops. You don't have a order history.</h3>
            ) : (
              ""
            )}
          </div>
          <div className={styles.button_div}>
            {numOrdersOnPage < allOrders.length ? (
              <button
                id="load-more-orders-btn"
                onClick={loadMoreOrders}
                className={styles.button1}
              >
                Load more
              </button>
            ) : (
              ""
            )}
            {numOrdersOnPage > minOrdersOnPage ? (
              <button
                id="load-less-orders-btn"
                onClick={loadLessOrders}
                className={styles.button2}
              >
                Load less
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.reviews}>
          <h1>Your reviews ({allReviews.length})</h1>
          {reviews.map((review) => {
            return (
              <div key={review[0]} className={styles.review}>
                {review[3][0] == "image" ? (
                  <img
                    src={`http://localhost:8000${review[3][1]}`}
                    alt=""
                    className={styles.image}
                  />
                ) : review[3][0] == "video" ? (
                  <video controls>
                    <source
                      src={`http://localhost:8000${review[3][1]}`}
                      type="video/mp4"
                      className={styles.video}
                    />
                  </video>
                ) : (
                  ""
                )}
                <div className={styles.text}>
                  <h3>{review[0]}</h3>
                  <h3>{review[1]} stars</h3>
                  <p>{review[2]}</p>
                </div>
              </div>
            );
          })}
          {reviews.length == 0 ? (
            <h3>Oops. You don't have a review history.</h3>
          ) : (
            ""
          )}
          <div className={styles.button_div}>
            {numReviewsOnPage < allReviews.length ? (
              <button
                id="load-more-reviews-btn"
                onClick={loadMoreReviews}
                className={styles.button1}
              >
                Load more
              </button>
            ) : (
              ""
            )}
            {numReviewsOnPage > minReviewsOnPage ? (
              <button
                id="load-less-reviews-btn"
                onClick={loadLessReviews}
                className={styles.button2}
              >
                Load less
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
