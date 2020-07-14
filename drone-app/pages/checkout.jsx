import Router from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "../styles/checkout.module.scss";

import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const Info = () => {
  const [email, setEmail] = useState("example@domain.com");
  const [number, setNumber] = useState("123-456-7890");
  const [address, setAddress] = useState("123 Sesame Street");
  const [city, setCity] = useState("Flonkerton");
  const [firstName, setFirstName] = useState("Elmo");
  const [lastName, setLastName] = useState("Muppet");
  const [zip, setZip] = useState("00000");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const isLogged = useSelector((state) => state.isLoggedReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
  };

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Checkout</title>
      </head>
      <div id="side-image" className={styles.side_image}>
        <img src={"../images/checkout.svg"} className={styles.image} alt="" />
      </div>
      <div className={styles.content}>
        <img src={"../images/logo.jpg"} className={styles.logo} alt="" />
        <h1>Checkout</h1>
        <p className={styles.errors}>
          For safety, I have made it so you cannot input information on this
          page. You will still be able to "make a payment".
        </p>
        <input
          className={styles.input}
          placeholder="First Name"
          value={firstName}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Last Name"
          value={lastName}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Phone Number"
          value={number}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Address"
          value={address}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Zip Code"
          value={zip}
          readOnly={true}
        />

        <CountryDropdown
          value={country}
          onChange={(val) => handleCountryChange(val)}
          className={styles.dropdown}
        />
        <RegionDropdown
          className={styles.dropdown}
          disableWhenEmpty={true}
          country={country}
          value={region}
          onChange={(val) => handleRegionChange(val)}
        />
        <button
          className={styles.button_back}
          onClick={() => Router.push("/cart")}
        >
          Back to Cart
        </button>
        <button
          className={styles.button_pay}
          onClick={() => Router.push("/pay")}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Info;
