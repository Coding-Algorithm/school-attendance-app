import { View, Text } from "react-native";
import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { Reducer } from "../reducer/reducer";

const AppContext = createContext();

const INITIAL_STATE = {
  auth: {
    user: false,
    fetchingUser: false,
    fetchingUserError: false,
  },
  result: null,
};

const ContextProvider = ({ children }) => {
  const [showStack, setShowStack] = useState(0);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [date, setDate] = useState();
  const [checkError, setCheckError] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const setResult = (result) => {
    dispatch({ type: "SET_RESULT", payload: result });
  };

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = (user = false) => {
    dispatch({ type: "LOGOUT", payload: user });
  };

  useEffect(() => {}, [state.result]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setResult,
        showStack,
        setShowStack,
        login,
        logout,
        date,
        setDate,
        checkError,
        setCheckError,
        startDate,
        setStartDate,
        endDate,
        setEndDate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function GetContext() {
  return useContext(AppContext);
}

export { AppContext, ContextProvider };
