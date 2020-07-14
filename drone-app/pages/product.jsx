import Nav from "./Nav";
import Footer from "./Footer";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IncrementAction from "../store/actions/IncrementAction";
import DecrementAction from "../store/actions/DecrementAction";
import ZeroAction from "../store/actions/ZeroAction";
import Cookie from "js-cookie";

import styles from "../styles/product.module.scss";

const Product = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.isLoggedReducer);
  const count = useSelector((state) => state.CountReducer);
  const [allReviews, setAllReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const minReviewsOnPage = 3;
  const [numReviewsOnPage, setNumReviewsOnPage] = useState(minReviewsOnPage);

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/get/review/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data["reviews"].reverse());
        setAllReviews(data["reviews"].reverse());
        setReviews(data["reviews"].reverse().slice(0, minReviewsOnPage));
      })
      .catch((err) => console.log(err));
  }, []);

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

  useEffect(() => {
    if (count < 0) {
      dispatch(ZeroAction());
    }
  }, [count]);

  const handleSelector = () => {
    let sel = document.getElementById("select");
    const selOption = sel.value;

    if (selOption == "images") {
      const newReviews = allReviews.sort((review1, review2) => {
        if (review1.imageURL != null) {
          return -1;
        } else {
          return 1;
        }
      });
      setAllReviews(newReviews);
    } else if (selOption == "videos") {
      const newReviews = allReviews.sort((review1, review2) => {
        if (review1.videoURL != null) {
          return -1;
        } else {
          return 1;
        }
      });
      setAllReviews(newReviews);
    } else if (selOption == "lowToHigh") {
      const newReviews = allReviews.sort((review1, review2) => {
        if (review1.rating < review2.rating) {
          return -1;
        } else {
          return 1;
        }
      });
      setAllReviews(newReviews);
    } else if (selOption == "mostRecent") {
      const newReviews = allReviews.sort((review1, review2) => {
        if (review1.dateCreated < review2.dateCreated) {
          return 1;
        } else {
          return -1;
        }
      });
      setAllReviews(newReviews);
    } else {
      const newReviews = allReviews.sort((review1, review2) => {
        if (review1.rating > review2.rating) {
          return -1;
        } else {
          return 1;
        }
      });
      setAllReviews(newReviews);
    }

    setReviews(allReviews.slice(0, numReviewsOnPage));
  };

  const handleSharing = () => {
    const emailError = document.getElementById("emailError");
    emailError.textContent = "Please wait...";

    if (email != "") {
      const jwt = JSON.parse(Cookie.get("jwt"));
      const bearer = `Bearer ${jwt}`;

      fetch("http://localhost:8000/api/share/creatediscount/", {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["message"] == "code created and email sent") {
            emailError.textContent = "Check your email for the code!";
          } else if (data["message"] == "invited user already exists") {
            emailError.textContent =
              "Oops. Looks like the user already exists.";
          } else if (data["message"] == "the email doesn't seem to exist") {
            emailError.textContent = "Oops. The email appears to be invalid.";
          }
        })
        .catch((err) => console.log(err));
      setEmail("");
    } else {
      emailError.textContent = "Please enter an email.";
    }
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Shop</title>
      </head>
      <Nav />
      <div className={styles.product}>
        <div className={styles.img_slideshow}>
          <div className={styles.img_slides}>
            <input type="radio" name="s" className={styles.s1} id="s1" />
            <input type="radio" name="s" className={styles.s2} id="s2" />
            <input type="radio" name="s" className={styles.s3} id="s3" />
            <input type="radio" name="s" className={styles.s4} id="s4" />

            <div className={styles.img1}>
              <img src={"../images/product_images/img1.jpg"} alt="" />
            </div>
            <div className={styles.img2}>
              <img src={"../images/product_images/img3.png"} alt="" />
            </div>
            <div className={styles.img3}>
              <img src={"../images/product_images/img2.jpeg"} alt="" />
            </div>
          </div>
          <div className={styles.img_navigation}>
            <label htmlFor="s1" className={styles.img_bar}></label>
            <label htmlFor="s2" className={styles.img_bar}></label>
            <label htmlFor="s3" className={styles.img_bar}></label>
          </div>
        </div>
        <div className={styles.text}>
          <h1>Mavic Air 2</h1>
          <div className={styles.count_div}>
            <button
              onClick={() => dispatch(IncrementAction())}
              className={styles.button}
            >
              +
            </button>
            <p className={styles.count}>{count}</p>
            <button
              onClick={() => dispatch(DecrementAction())}
              className={styles.button}
            >
              -
            </button>
          </div>
          <h3>$99.99</h3>
          <button
            onClick={() => Router.push("/cart")}
            className={styles.button}
          >
            Go to cart
          </button>
          <div className={styles.sharing}>
            <p className={styles.p}>
              Share the product through email for a discount!
            </p>
            <input
              value={email}
              onChange={handleEmailChange}
              className={styles.email}
              type="email"
              placeholder="Email"
            />
            <button onClick={handleSharing} className={styles.share}>
              Share!
            </button>
          </div>
          <p id="emailError" className={styles.error}></p>
        </div>
      </div>
      <div className={styles.portable}>
        <div className={styles.image_div}>
          <img src={"../images/portable.jpg"} className={styles.image} alt="" />
        </div>
        <div className={styles.text}>
          <div className={styles.box}>
            <h1>Portable</h1>
            Coming in at just 1.26 pounds, the Mavic Air 2 allows for
            portability anytime and anywhere you want. Simply pack your Mavid
            Air 2, controller, phone, and yourself and get ready to fly off into
            the sky.
            <br />
            <br />
            Worried about switching out the wings? Don't worry about it. The
            Mavic Air 2 comes with spare wings in case you ever want to switch
            out your old, rusty wings. One of the best parts in all of this the
            bag that comes with the Mavic Air 2. Don't worry about getting your
            own bag, simply store it in outs and you are good to go in seconds!
          </div>
        </div>
      </div>
      <div className={styles.connectivity}>
        <div className={styles.text}>
          <div className={styles.box}>
            <h1>Connect to your smartphone</h1>
            A drone is just a drone. But with a camera, it becomes a vehicle and
            beacon for vision. With the Mavic Air 2 controller and drone
            capabilities, not only can you go to aa max altitude of 3.1 miles,
            you are able to bring yourself along on the ride.
            <br />
            <br />
            By connecting to your Mavic Air 2, you will be able to see what the
            Mavic Air sees through its camera. Glide your drone down the beach,
            across the ocean, or your own backyard and get the spectacular view
            you just can't get at the ground level. Who knows, maybe you'll see
            a whale or two?
          </div>
        </div>
        <div className={styles.image_div}>
          <img
            src={"../images/drone_camera.jpg"}
            className={styles.image}
            alt=""
          />
        </div>
      </div>
      <div className={styles.camera_info}>
        <div className={styles.image_div}>
          <img
            src={"../images/camera_info.jpg"}
            className={styles.image}
            alt=""
          />
        </div>
        <div className={styles.text}>
          <div className={styles.box}>
            <h1>HD Camera</h1>
            There's no point of connecting to a drone's camera if the quality
            isn't there; however, we have spent much time with the most talented
            engineers to create the camera stored inside of the Mavic Air 2.
            <br />
            <br />
            Stored inside of the Mavic Air 2 is a <strong>48 mexapixel </strong>
            camera with <strong>f2.8</strong>
            aperture. This camera gives a <strong>84°</strong> angle of view for
            maximizing the camera view for anyone using it. This paired with the
            beautiful scenic views nature has to offer give the most stunning
            images.
            <br />
            <br />
            But don't take our word for it, take a look at the slideshow below.
          </div>
        </div>
      </div>
      <div className={styles.slideshow}>
        <h1 className={styles.capture_heading}>Images by Mavic Air 2</h1>
        <div className={styles.slides}>
          <input type="radio" name="r" className={styles.r1} id="r1" />
          <input type="radio" name="r" className={styles.r2} id="r2" />
          <input type="radio" name="r" className={styles.r3} id="r3" />

          <div className={styles.slide1}>
            <img src={"../images/camera_showcase/img3.jpg"} alt="" />
          </div>
          <div className={styles.slide2}>
            <img src={"../images/camera_showcase/img1.jpg"} alt="" />
          </div>
          <div className={styles.slide3}>
            <img src={"../images/camera_showcase/img4.jpg"} alt="" />
          </div>
        </div>
        <div className={styles.navigation}>
          <label htmlFor="r1" className={styles.bar}></label>
          <label htmlFor="r2" className={styles.bar}></label>
          <label htmlFor="r3" className={styles.bar}></label>
        </div>
      </div>
      <h1 className={styles.glimpse}>A Glimpse</h1>
      <video controls className={styles.trailer}>
        <source src={"../videos/trailer.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.review_text_btn}>
        <h1>Reviews</h1>
        <button
          onClick={() => Router.push("/review")}
          className={styles.button}
        >
          Leave a review
        </button>
      </div>
      <div className={styles.filter}>
        <p>Filter by:</p>
        <select id="select" className={styles.select} onChange={handleSelector}>
          <option value="">Select</option>
          <option value="mostRecent">Most recent</option>
          <option value="highToLow">Highest to lowest ratings</option>
          <option value="lowToHigh">Lowest to highest ratings</option>
          <option value="images">Images</option>
          <option value="videos">Videos</option>
        </select>
      </div>
      <div id="review-div" className={styles.reviews}>
        {reviews.map((review) => (
          <div key={review.dataCreated} className={styles.review}>
            <div className={styles.text}>
              <div className={styles.rating_content}>
                <p>{review.rating}</p>
                <img
                  src={"../images/star.png"}
                  className={styles.star}
                  alt=""
                />
              </div>
              <h3>{review.name}</h3>
              <p>{review.dateCreated.substring(0, 10)}</p>
              <p>{review.review}</p>
            </div>
            {review.imageURL != null ? (
              <img
                src={`http://localhost:8000${review.imageURL}`}
                className={styles.image}
                alt=""
              />
            ) : (
              ""
            )}
            {review.videoURL != null ? (
              <video controls className={styles.video}>
                <source
                  src={`http://localhost:8000${review.videoURL}`}
                  type="video/mp4"
                />
              </video>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
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
      <Footer />
    </div>
  );
};

export default Product;
