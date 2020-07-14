import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import IncrementAction from "../store/actions/IncrementAction";
import DecrementAction from "../store/actions/DecrementAction";
import ZeroAction from "../store/actions/ZeroAction";
import FinalCostAction from "../store/actions/FinalCostAction";
import DiscountCodeAction from "../store/actions/DiscountCodeAction";
import Cookie from "js-cookie";

import styles from "../styles/cart.module.scss";

const Checkout = () => {
  const isLogged = useSelector((state) => state.isLoggedReducer);

  useEffect(() => {
    if (isLogged == false) {
      Router.push("/");
    }
  }, []);

  const dispatch = useDispatch();

  const count = useSelector((state) => state.CountReducer);
  const [discountCode, setDiscountCode] = useState("10OFF");
  const [percentOff, setPercentOff] = useState(0);

  const onChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const checkCode = () => {
    const discountError = document.getElementById("discountError");
    discountError.textContent = "";

    if (discountCode != "") {
      const jwt = JSON.parse(Cookie.get("jwt"));
      const bearer = `Bearer ${jwt}`;

      fetch("http://localhost:8000/api/discount/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: bearer },
        body: JSON.stringify({
          string: discountCode,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["message"] == "code doesnt exist") {
            discountError.textContent = "Code doesn't exist";
          } else {
            setPercentOff(data["message"]);
            dispatch(DiscountCodeAction(discountCode));
          }
        });
    }
    setDiscountCode("");
  };

  useEffect(() => {
    if (count < 0) {
      dispatch(ZeroAction());
    }
  }, [count]);

  const submit = () => {
    const finalCost = (count * 99.99 * (100 - percentOff) * 0.01).toFixed(2);
    dispatch(FinalCostAction(finalCost));
    Router.push("/checkout");
  };

  return (
    <div className={styles.wrapper}>
      <head>
        <title>Cart</title>
      </head>
      <div className={styles.content}>
        <img src={"../images/logo.jpg"} className={styles.logo} alt="" />
        <h1>Cart</h1>
        <div className={styles.count_div}>
          <button
            className={styles.button}
            onClick={() => dispatch(IncrementAction())}
          >
            +
          </button>
          <p className={styles.count}>{count}</p>
          <button
            className={styles.button}
            onClick={() => dispatch(DecrementAction())}
          >
            -
          </button>
        </div>
        <p>
          Total Cost: ${(count * 99.99 * (100 - percentOff) * 0.01).toFixed(2)}
        </p>
        <div className={styles.discount_div}>
          <p>Use code 10OFF for 10% off on your order!</p>
          <input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={onChange}
            className={styles.input}
          />
          <button className={styles.button} onClick={checkCode}>
            Apply
          </button>
        </div>
        <p id="discountError" className={styles.errors}></p>
        <button
          className={styles.button_back}
          onClick={() => Router.push("/product")}
        >
          Continue Shopping
        </button>
        {count == 0 ? (
          <h3>Oops. You didn't add any products.</h3>
        ) : (
          <button onClick={submit} className={styles.button_checkout}>
            Go to Checkout
          </button>
        )}
      </div>
      <div className={styles.side_image}>
        <img
          className={styles.image}
          src={"../images/shopping_cart.svg"}
          alt=""
        />
      </div>
    </div>
  );
};

export default Checkout;
