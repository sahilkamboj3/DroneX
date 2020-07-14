import Router from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import ZeroAction from "../store/actions/ZeroAction";

import styles from "../styles/pay.module.scss";

const Pay = () => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState("9999999999");
  const [cardName, setCardName] = useState("Elmo");
  const [expirationDate, setExpirationDate] = useState("00-00");
  const [securityCode, setSecurityCode] = useState("9999");

  const count = useSelector((state) => state.CountReducer);
  const finalCost = useSelector((state) => state.FinalCostReducer);
  const isLogged = useSelector((state) => state.isLoggedReducer);
  const discountCode = useSelector((state) => state.DiscountCodeReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  const handlePay = () => {
    const jwt = JSON.parse(Cookie.get("jwt"));
    const bearer = `Bearer ${jwt}`;

    // pay
    fetch("http://localhost:8000/api/pay/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      body: JSON.stringify({
        count: count,
        finalCost: finalCost,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    // send thank you email
    fetch("http://localhost:8000/api/pay/email/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      body: JSON.stringify({
        count: count,
        finalCost: finalCost,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    // delete one time discount code

    if (discountCode != "10OFF") {
      fetch("http://localhost:8000/api/delete/discount/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: bearer },
        body: JSON.stringify({
          string: discountCode,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }

    dispatch(ZeroAction());
    Router.push("/thanks");
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Pay</title>
      </head>
      <div className={styles.content}>
        <img src={"../images/logo.jpg"} className={styles.logo} alt="" />
        <h1>Pay Now</h1>
        <p className={styles.errors}>
          For safety, I have made it so you cannot input information on this
          page. You will still be able to "make a payment".
        </p>
        <input
          className={styles.input}
          placeholder="Card number"
          value={cardNumber}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Name on card"
          value={cardName}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          readOnly={true}
        />
        <input
          className={styles.input}
          placeholder="Security code"
          value={securityCode}
          readOnly={true}
        />
        <button
          className={styles.button_back}
          onClick={() => Router.push("/cart")}
        >
          Back to Cart
        </button>
        <button className={styles.button_pay} onClick={handlePay}>
          Pay
        </button>
      </div>
      <div className={styles.side_image}>
        <img src={"../images/pay.svg"} className={styles.image} alt="" />
      </div>
    </div>
  );
};

export default Pay;
