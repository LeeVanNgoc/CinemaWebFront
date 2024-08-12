import {
  SET_SELECTED_NEWS,
  CLEAR_SELECTED_NEWS,
  GET_NEWS,
  GET_NEWS_SUCCESS,
  NEWS_REFRESH,
} from "../actions/newsActions";

const initialState = {
  news: [],
  selectedNews: [],
  loading: false,
  error: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
      };
    case SET_SELECTED_NEWS:
      return {
        ...state,
        selectedNews: action.payload,
      };
    case NEWS_REFRESH:
      return {
        ...state,
        selectedNews: JSON.parse(localStorage.getItem("selectedNews")),
      };
    case CLEAR_SELECTED_NEWS:
      return {
        ...state,
        selectedNews: [],
      };
    default:
      return state;
  }
};

export default newsReducer;
