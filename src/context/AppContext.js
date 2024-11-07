import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:2000/api/";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const isUserInfoRetrieved = useRef(false);

  const navigate = useNavigate();

  const userInfoFromCache = JSON.parse(localStorage.getItem("userInfo"));
  if (!isUserInfoRetrieved.current) {
    setUserInfo(userInfoFromCache);
    isUserInfoRetrieved.current = true;
  }

  //================================= LOGIN ===================================== //
  const loginUser = async ({ email, password }) => {
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const resp = await response.json();
      const userInfo = { ...resp?.data, isLoggedIn: true };
      console.log(userInfo);
      setUserInfo(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/tasks");
      // call fetch Task function
      getAllTasks(userInfo.authToken);
    } else {
      const resp = await response.json();
      alert(resp.error);
    }
  };
  //================================= LOGOUT ==================================== //
  const logoutUser = () => {
    localStorage.clear();
    setUserInfo(null);
    isUserInfoRetrieved.current = false;
  };

  //===================================== SIGNUP ======================================== //
  const signupUser = async ({ email, password, name }) => {
    const response = await fetch(`${baseUrl}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (response.ok) {
      const resp = await response.json();
      const userInfo = { ...resp?.data, isLoggedIn: true };
      setUserInfo(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/tasks");
    } else {
      const res = await response.json();
      alert(res.error);
    }
  };

  //============================== FETCH ALL TASKS ================================ //
  const getAllTasks = async (token) => {
    if (!token) return;

    const response = await fetch(`${baseUrl}tasks/fetchalltasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    // set all tasks in state
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  //==============================  CREATE NEW TASK ============================== //
  const addTask = async ({ title, description, dueDate }) => {
    const token = userInfo.authToken;

    if (!token) return;
    const response = await fetch(`${baseUrl}tasks/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, description, dueDate }),
    });
    // Update tasks state after adding
    console.log(response);
    if (response.ok) {
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  //================================ DELETE A TASK ======================================= //
  const deleteTask = async (id) => {
    const token = userInfo.authToken;
    if (!token) return;
    console.log(id);
    const response = await fetch(`${baseUrl}tasks/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    // Remove task from state after deleting
    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };

  // =============== Edit a task (assuming task id is used to identify and update) ============/
  const editTask = async (id, updatedTask) => {
    const token = userInfo.authToken;
    if (!token) return;

    const response = await fetch(`${baseUrl}tasks/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      // const data = await response.json();
      // setTasks((prevTasks) =>
      //   prevTasks.map((task) => (task._id === id ? data : tasks))
      // );
      getAllTasks(token);
    }
  };

  useEffect(() => {
    getAllTasks(userInfo?.authToken);
  }, [userInfo]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        userInfo,
        addTask,
        deleteTask,
        editTask,
        getAllTasks,
        setUserInfo,
        loginUser,
        signupUser,
        logoutUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

// Custom hook to access context values
export const useAppContext = () => {
  return useContext(AppContext);
};
