const DiscountCodeReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_DISCOUNT_CODE":
      return action.payload;
    default:
      return state;
  }
};

export default DiscountCodeReducer;
