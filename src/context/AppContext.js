import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://task-manager-back-834v.onrender.com/api/";
// const baseUrl = "http://localhost:2000/api/";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const isUserInfoRetrieved = useRef(false);
  const [isSignup, setShowSignup] = useState(false);
  const [isLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  const userInfoFromCache = JSON.parse(localStorage.getItem("userInfo"));
  if (!isUserInfoRetrieved.current) {
    setUserInfo(userInfoFromCache);
    isUserInfoRetrieved.current = true;
  }

  //================================= LOGIN ===================================== //
  const loginUser = async ({ email, password }) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (response.ok) {
      const resp = await response.json();
      const userInfo = { ...resp?.data, isLoggedIn: true };
      setUserInfo(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/tasks");
      // call fetch Task function
      getAllTasks(userInfo.authToken);
      setShowLogin(false);
      setShowSignup(false);
    } else {
      const resp = await response.json();
      alert(resp.error);
    }
  };
  //================================= LOGOUT ==================================== //
  const logoutUser = () => {
    localStorage.clear();
    setUserInfo(null);
    setShowLogin(false);
    setShowSignup(false);
    isUserInfoRetrieved.current = false;
  };

  //===================================== SIGNUP ======================================== //
  const signupUser = async ({ email, password, name }) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    setLoading(false);
    if (response.ok) {
      const resp = await response.json();
      const userInfo = { ...resp?.data, isLoggedIn: true };
      setUserInfo(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/tasks");
      setShowLogin(false);
      setShowSignup(false);
    } else {
      const res = await response.json();
      alert(res.error);
    }
  };

  //============================== FETCH ALL TASKS ================================ //
  const getAllTasks = async (token) => {
    if (!token) return;
    setLoading(true);
    const response = await fetch(`${baseUrl}tasks/fetchalltasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    setLoading(false);
    // set all tasks in state
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  //==============================  CREATE NEW TASK ============================== //
  const addTask = async ({ title, description, dueDate }) => {
    const token = userInfo.authToken;

    if (!token) return;
    setLoading(true);
    const response = await fetch(`${baseUrl}tasks/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, description, dueDate }),
    });
    setLoading(false);
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
    setLoading(true);
    if (!token) return;
    const response = await fetch(`${baseUrl}tasks/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    setLoading(false);
    // Remove task from state after deleting
    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };

  // =============== Edit a task (assuming task id is used to identify and update) ============/
  const editTask = async (id, updatedTask) => {
    const token = userInfo.authToken;
    if (!token) return;
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    getAllTasks(userInfo?.authToken);
  }, [userInfo]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        userInfo,
        loading,
        isSignup,
        isLogin,
        setShowLogin,
        setShowSignup,
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
