const DiscountCodeAction = (cost = 0) => {
  return {
    type: "SET_DISCOUNT_CODE",
    payload: cost,
  };
};

export default DiscountCodeAction;
