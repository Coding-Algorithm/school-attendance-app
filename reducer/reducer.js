const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload,
      };
      break;
    case "LOGIN_START":
      return {
        ...state,
        auth: {
          ...state.auth,
          fetchingUser: true,
        },
      };
      break;
    case "LOGIN_SUCCESS":
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
        },
      };
      break;
    case "LOGIN_FAILURE":
      return {
        ...state,
        auth: {
          ...state.auth,
          fetchingUserError: action.payload,
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
    case "SIGNUP":
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
