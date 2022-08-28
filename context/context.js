import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { Reducer } from "../reducer/reducer";
import * as SQLite from "expo-sqlite";


const AppContext = createContext();

const INITIAL_STATE = {
  auth: {
    user: false,
    fetchingUser: false,
    fetchingUserError: false,
  },
  result: null,
};

// Component Starting
const ContextProvider = ({ children }) => {
  const [showStack, setShowStack] = useState(0);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [date, setDate] = useState();
  const [checkError, setCheckError] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function openDatabase() {
    const db = SQLite.openDatabase("attendance.db");
    return db;
  }

  const db = openDatabase();



  function add(data) {
    db.transaction((txn) => {
      txn.executeSql("INSERT INTO students (name) VALUES (?)", [data.fullname]);
    });
  }

  // Context Methods:
  const setResult = (result) => {
    dispatch({ type: "SET_RESULT", payload: result });
  };

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = (user = false) => {
    dispatch({ type: "LOGOUT", payload: user });
  };

  const signup = (data = {}) => {
    dispatch({ type: "SIGNUP", payload: data, method: add });
  };

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, name TEXT) `
      );
    });
    db.transaction((txn) => {
      txn.executeSql("INSERT INTO students (name) VALUES (?)", ["fullname"]);
      txn.executeSql("SELECT * FROM students", [], (_, {res}) => {
        console.log("1" + res) });    });
    
    
    console.log(db);
  }, [db]);
  
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
        setEndDate,
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
