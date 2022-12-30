// we are using useReducer insted of useState for manage Data.

// The useReducer Hook is the better alternative to the useState hook
// and is generally more preferred over the useState hook when you have
// complex state-building logic or when the next state value depends upon
// its previous value or when the components are needed to be optimized.

import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
    singleUser: {},
    repos: [],
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const url = process.env.REACT_APP_GITHUB_URL;

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const searchUser = async (text) => {
    let params = new URLSearchParams({
      q: text,
    });

    setLoading();
    let res = await fetch(`${url}/search/users?${params}`);
    const { items } = await res.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // get user details
  const getSingleUser = async (user) => {
    setLoading();
    let res = await fetch(`${url}/users/${user}`);

    if (res.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await res.json();
      dispatch({
        type: "GET_SINGLE_USER",
        payload: data,
      });
    }
  };

  // get user repos
  const getUserRepos = async (login) => {
    setLoading();

    let params = new URLSearchParams({
      // sort: 'created',
      per_page:10
    });

    let res = await fetch(`${url}/users/${login}/repos?${params}`);

    const data = await res.json();
    dispatch({
      type: "GET_USER_REPOS",
      payload: data,
    });
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        singleUser: state.singleUser,
        repos: state.repos,
        searchUser,
        clearUsers,
        getSingleUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
