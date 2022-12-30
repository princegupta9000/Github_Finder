const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };
    case "GET_SINGLE_USER":
      return {
        ...state,
        singleUser: action.payload,
        isLoading: false,
      };
    case "GET_USER_REPOS":
      return {
        ...state,
        repos: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default GithubReducer;
