const isLoggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGNED_IN":
      return true;
    case "SIGNED_OUT":
      return false;
    default:
      return state;
  }
};

export default isLoggedReducer;
