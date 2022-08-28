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
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);

  function openDatabase() {
    const db = SQLite.openDatabase("attendance.db");
    return db;
  }

  const db = openDatabase();

  const insert = (data) => {
    const {
      userID,
      fullname,
      department,
      faculty,
      fingerprint,
      email,
      password,
      courses
    } = data;

    const text = data.fullname;

    db.transaction((txn) => {


      // txn.executeSql(
      //   "DROP TABLE students",[],
      //   () => console.log("TABLE Deleted"),
      //   (error) => console.log("TABLE not Deleted")
      // );

      // txn.executeSql(
      //   "DROP TABLE courses",[],
      //   () => console.log("COURSES Deleted"),
      //   (error) => console.log("COURSES not Deleted")
      // );

      // txn.executeSql(
      //   "DROP TABLE attendance",[],
      //   () => console.log("ATTENDANCE Deleted"),
      //   (error) => console.log("ATTENDANCE Deleted")
      // );


      txn.executeSql(
        "insert into students (userID,name,courses, dept, faculty, fingerprint, email, password) values (?,?,?,?,?,?,?,?)",
        [userID, fullname, courses, department, faculty, fingerprint, email, password],
        () => console.log("Student Added"),
        (error) => console.log({...error}, error.message)
      );

      txn.executeSql("select * from students", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
        console.log("Done");
      });
    }, null);
  };

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS students (userID varchar(13) PRIMARY KEY NOT NULL, name varchar(100), courses varchar(255), dept varchar(3), faculty varchar(50), fingerprint varchar(255), email varchar(50), password varchar(30));",
        [],
        (txn, { rows }) => {
          console.log("Students created");
        },
        (error) => {
          console.log("Not Created");
        }
      );

      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS courses (id varchar(6) PRIMARY KEY NOT NULL, lecturer varchar(10), unit INTEGER, title varchar(255), dept varchar(255), faculty varchar(50));",
        [],
        (txn, { rows }) => {
          console.log("Courses created");
        },
        (error) => {
          console.log("Courses not Created");
        }
      );

      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY NOT NULL, course varchar(6), date DATA, attended INTEGER, time TIME);",
        [],
        (txn, { rows }) => {
          console.log("Attendance created");
        },
        (error) => {
          console.log("Attendance not Created");
        }
      );
    });
  }, []);

  const add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into info (value, name, address) values (?, ?, ?)",
          ["text", "Ibrahim", "Good"]
        );

        tx.executeSql("select * from info", [], (_, { rows }) => {
          console.log(JSON.stringify(rows));
          console.log("Done");
        });
      }
      // null,
      // forceUpdate
    );
  };

  function get(value = "*", table, ORDER) {
    db.transaction((txn) => {
      txn.executeSql(`SELECT ${value} FROM ${table} ORDER BY id DESC`),
        [],
        (sqlTxn, { rows: { _array } }) => {
          console.log(JSON.stringify(_array));
        };
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
    dispatch({ type: "SIGNUP", payload: { data: data, method: add() } });
  };

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
        insert,
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
