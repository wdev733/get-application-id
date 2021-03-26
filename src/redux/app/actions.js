const actions = {
  APPLY: "APPLY",
  GET_APPLICATION_ID: "GET_APPLICATION_ID",

  apply: (hash, callback) => ({
    type: actions.APPLY,
    payload: { hash, callback },
  }),
  getApplicationId: (email, callback) => ({
    type: actions.GET_APPLICATION_ID,
    payload: { email, callback },
  }),
};

export default actions;
