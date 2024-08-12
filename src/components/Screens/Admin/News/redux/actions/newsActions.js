import { handleGetListNews, handleGetNewsById } from "../../config";

export const SET_SELECTED_NEWS = "SET_SELECTED_NEWS";
export const CLEAR_SELECTED_NEWS = "CLEAR_SELECTED_NEWS";
export const GET_NEWS = "GET_NEWS";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const NEWS_REFRESH = "NEWS_REFRESH";

export const setSelectedNews = (post) => {
  localStorage.setItem("selectedNews", JSON.stringify(post));
  return async (dispatch, getState) => {
    dispatch({ type: SET_SELECTED_NEWS, payload: post });
  };
};

export const clearSelectedNews = () => ({
  type: CLEAR_SELECTED_NEWS,
});

export const handleRefreshNews = () => {
  return async (dispatch, getState) => {
    dispatch({ type: NEWS_REFRESH });
  };
};

export const getNews = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "GET_NEWS" });
    try {
      let res = await handleGetListNews();
      console.log("res list news >>>", res);
      if (res && res.news) {
        const formattedData = res.news.map((item) => ({
          postId: item.postId,
          title: item.title,
          content: item.content,
          postDate: item.postDate,
          image: item.image,
        }));
        dispatch({
          type: "GET_NEWS_SUCCESS",
          payload: { news: formattedData },
        });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
};
