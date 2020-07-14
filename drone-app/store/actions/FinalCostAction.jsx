const FinalCostAction = (cost = 0) => {
  return {
    type: "SET_FINAL_COST",
    payload: cost,
  };
};

export default FinalCostAction;
