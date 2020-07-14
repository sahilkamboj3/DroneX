const FinalCostReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_FINAL_COST":
      return action.payload;
    default:
      return state;
  }
};

export default FinalCostReducer;
