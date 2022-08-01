const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload,
      };
      break;
    case "LOGIN":
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
        },
      };
      break;
      case "LOGOUT":
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
        },
      };
      break;
    default:
      return state;
  }
};

export { Reducer };
