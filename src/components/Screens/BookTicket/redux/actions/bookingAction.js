import {
  handleGetPlanId,
  handleGetStartTime,
  handleGetCost,
} from "../../config";
export const GET_SELECTED_PLAN = "GET_SELECTED_PLAN";
export const SET_SELECTED_SEAT = "SET_SELECTED_SEAT";
export const CLEAR_SELECTED_SEATS = "CLEAR_SELECTED_SEATS";
export const SET_DATE = "SET_DATE";
export const SET_TIME = "SET_TIME";
export const SET_ROOM = "SET_ROOM";
export const SET_TOTAL_BILL = "SET_TOTAL_BILL";
export const GET_PLAN_TIMES = "GET_PLAN_TIMES";

export const getPlanIdForCreateTicket = (
  roomId,
  movieId,
  startTime,
  dateScreen
) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetPlanId(roomId, movieId, startTime, dateScreen);
      console.log("get plan id: ", res);
      if (res && res.errCode === 0) {
        const formattedData = res.planScreenMovieId;
        dispatch({
          type: "GET_SELECTED_PLAN",
          payload: { formattedData },
        });
      } else {
        console.error("Dữ liệu không đúng định dạng hoặc không có dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
};

export const getPlanTime = (dateScreen, movieId) => {
  return async (dispatch, getState) => {
    try {
      const resTimes = await handleGetStartTime(dateScreen, movieId);
      console.log("resTime: ", resTimes);
      if (resTimes && resTimes.errCode === 0) {
        const formattedData = resTimes.startTimes;
        dispatch({
          type: "GET_PLAN_TIMES",
          payload: { formattedData },
        });
      } else {
        console.error("Dữ liệu không đúng định dạng hoặc không có dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
};

// export const getPlanTime = (movieId) => {
//   return async (dispatch, getState) => {
//     try {
//       const resPlans = await handleGetAllPlansByMovie(movieId);
//       // console.log("resPlans: ", resPlans);

//       if (
//         resPlans &&
//         resPlans.errCode === 0 &&
//         Array.isArray(resPlans.planScreenMovieId)
//       ) {
//         const timeArray = await Promise.all(
//           resPlans.planScreenMovieId.map(async (planId) => {
//             const resPlan = await handleGetPlanById(planId);
//             // console.log("resPlanTime: ", resPlan);
//             if (resPlan && resPlan.errCode === 0) {
//               return resPlan.planScreenMovie.startTime;
//             }
//             return [];
//           })
//         );
//         console.log(">> timeArray: ", timeArray);

//         const flattenedTimeArray = timeArray.flatMap((times) => times);

//         dispatch({
//           type: "SET_PLAN_TIME",
//           payload: { planTime: flattenedTimeArray },
//         });
//       } else {
//         console.error("Dữ liệu không đúng định dạng hoặc không có dữ liệu.");
//       }
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//     }
//   };
// };

export const setSelectedSeat = (seat, roomType, seatType, isWeekend) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetCost(roomType, seatType, isWeekend);
      console.log("get cost: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: SET_SELECTED_SEAT,
          payload: { seat: seat, pricePerSeat: res.costOutput },
        });
      } else {
        console.error("Dữ liệu không đúng định dạng hoặc không có dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
};

export const clearSelectedSeats = () => ({
  type: CLEAR_SELECTED_SEATS,
});

export const setDate = (date) => ({
  type: SET_DATE,
  payload: { date },
});

export const setTime = (time) => ({
  type: SET_TIME,
  payload: { time },
});

export const setRoom = (room) => ({
  type: SET_ROOM,
  payload: { room },
});

export const setTotalBill = (totalBill) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SET_TOTAL_BILL,
      payload: { totalBill },
    });
  };
};
