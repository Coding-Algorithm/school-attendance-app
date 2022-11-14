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
  const [studentsForCourse, setStudentsForCourse] = useState([]);

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
      courses,
      userType,
    } = data;

    const receivingTable = userType.toLowerCase() + "s";

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
      //   (error) => console.log("ATTENDANCE not Deleted")
      // );

      if (userType === "student") {
        txn.executeSql(
          `insert into ${receivingTable} (userID,name,courses, dept, faculty, fingerprint, email, password) values (?,?,?,?,?,?,?,?)`,
          [
            userID,
            fullname,
            courses,
            department,
            faculty,
            fingerprint,
            email,
            password,
          ],
          () => console.log(`${userType} Added`),
          (error) => console.log("Error", error)
        );
      } else {
        console.log("lecturer");
        txn.executeSql(
          `insert into ${receivingTable} (userID,name,courses, dept, faculty, email, password) values (?,?,?,?,?,?,?)`,
          [userID, fullname, courses, department, faculty, email, password],
          () => console.log(`${userType} Added`),
          (error) => console.log("Error", error.message)
        );
      }

      txn.executeSql(
        `select * from ${receivingTable}`,
        [],
        (_, { rows }) => {
          console.log(JSON.stringify(rows));
          console.log("Done");
        },
        (e) => console.log("Nothing", { ...e })
      );
    }, null);
  };

  const markAttendance = ({ chosenCourse, chosenStudent, date }) => {
    console.log(chosenCourse, chosenStudent, date);

    db.transaction(
      (txn) => {
        console.log("got here");
        txn.executeSql(
          `insert into attendance (id,course, date, attended, student) values (?,?,?,?,?)`,
          [date, chosenCourse, date, 1, chosenStudent],
          () => console.log(`${userType} Added`),
          (error) => console.log("Error", error)
        );
      },
      null
      // forceUpdate
    );
  };

  const checkIsStudentTakingCourse = (userCourse, course) => {
    const userCourseList = userCourse.split(",");

    const isThere = userCourseList.includes(course);

    return isThere ? true : false;
  };

  function getStudentsForCourse({ value = "*", table = "students", course }) {
    console.log(value, table, course);

    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM students`,
        [],
        (_, { rows: { _array } }) => {
          const stringifyUser = JSON.stringify(_array);

          let parsedUser = JSON.parse(stringifyUser);

          // console.log("parsedUser")
          // console.log(parsedUser)

          let studentsForCourseList = [];
          setStudentsForCourse([]);

          parsedUser.map((student) => {
            console.log(student.courses, ":::", course);
            const isStudentTakingCourse = checkIsStudentTakingCourse(
              student.courses,
              course
            );

            // console.log('taking?', isStudentTakingCourse)
            isStudentTakingCourse && studentsForCourseList.push(student.userID);
          });

          setStudents([...studentsForCourseList]);
        },
        (e) =>
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "User ID or Password Invalid",
          })
      );
    });
  }

  // Context Methods:
  const setResult = (result) => {
    dispatch({ type: "SET_RESULT", payload: result });
  };

  const login = (user) => {
    dispatch({ type: "LOGIN_START" });

    const { userID, password, userType } = user;

    const receivingTable = userType.toLowerCase() + "s";

    db.transaction((txn) => {
      txn.executeSql(
        `select * from ${receivingTable} WHERE userID='${userID}' AND password=${password}`,
        [],
        (_, { rows: { _array } }) => {
          console.log("Inside executeSql");
          const stringifyUser = JSON.stringify(_array[0]);
          console.log("parsedUser", _array[0]);
          let parsedUser = JSON.parse(stringifyUser);
          parsedUser.userType = userType;
          dispatch({ type: "LOGIN_SUCCESS", payload: parsedUser });

          console.log(userType);
        },
        (e) =>
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "User ID or Password Invalid",
          })
      );
    }, null);
  };

  const logout = (user = false) => {
    dispatch({ type: "LOGOUT", payload: user });
  };

  const signup = (data = {}) => {
    dispatch({ type: "SIGNUP", payload: { data: data, method: add() } });
  };

  useEffect(() => {
    db.transaction((txn) => {
      // create student table
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

      // create lecturer table
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS lecturers (userID varchar(13) PRIMARY KEY NOT NULL, name varchar(100), courses varchar(255), dept varchar(3), faculty varchar(50), email varchar(50), password varchar(30));",
        [],
        (txn, { rows }) => {
          console.log("Lecturers created");
        },
        (error) => {
          console.log("Not Created");
        }
      );

      // create courses table
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

      // create attendance table
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY NOT NULL, course varchar(6), date DATE, attended INTEGER, student varchar(13));",
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
        studentsForCourse,
        setStudentsForCourse,
        students,
        setStudents,
        insert,
        getStudentsForCourse,
        markAttendance,
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
