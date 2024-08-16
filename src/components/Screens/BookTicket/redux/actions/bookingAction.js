import {
  handleGetPlanCode,
  handleGetStartTimeAndRoom,
  handleGetCost,
} from "../../config";
export const GET_SELECTED_PLAN = "GET_SELECTED_PLAN";
export const SET_SELECTED_SEAT = "SET_SELECTED_SEAT";
export const CLEAR_SELECTED_SEATS_AND_TIME = "CLEAR_SELECTED_SEATS_AND_TIME";
export const SET_DATE = "SET_DATE";
export const SET_TIME = "SET_TIME";
export const SET_ROOM = "SET_ROOM";
export const SET_BANK = "SET_BANK";
export const SET_TOTAL_BILL = "SET_TOTAL_BILL";
export const GET_PLAN_TIMES_AND_ROOM = "GET_PLAN_TIMES_AND_ROOM";
export const CLEAR_PLAN_TIMES_AND_ROOM = "CLEAR_PLAN_TIMES_AND_ROOM";
export const NO_PLAN_TIMES_AND_ROOM = "NO_PLAN_TIMES_AND_ROOM";

export const getPlanCodeForCreateTicket = (
  roomCode,
  movieCode,
  startTime,
  dateScreen
) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetPlanCode(
        roomCode,
        movieCode,
        startTime,
        dateScreen
      );
      console.log("get plan id: ", res);
      if (res && res.errCode === 0) {
        const formatted = res.planScreenMovieCode;
        dispatch({
          type: "GET_SELECTED_PLAN",
          payload: { formatted },
        });
      } else {
        console.error("Dữ liệu không đúng định dạng hoặc không có dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
};

export const getPlanTime = (dateScreen, movieCode) => {
  return async (dispatch, getState) => {
    try {
      const resTimes = await handleGetStartTimeAndRoom(dateScreen, movieCode);
      console.log("resTime: ", resTimes);
      if (resTimes && resTimes.errCode === 0) {
        const formattedData = resTimes.planScreens.map((item) => ({
          roomCode: item.roomCode,
          startTime: item.startTime,
        }));
        dispatch({
          type: "GET_PLAN_TIMES_AND_ROOM",
          payload: { formattedData },
        });
      } else if ((resTimes && resTimes.error) || resTimes.errCode === 1) {
        dispatch({
          type: "NO_PLAN_TIMES_AND_ROOM",
          payload: { message: "Không còn suất chiếu!" },
        });
      } else {
        console.error("Dữ liệu không đúng định dạng hoặc không có dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
};

export const clearStartTimeAndRoom = () => ({
  type: CLEAR_PLAN_TIMES_AND_ROOM,
});

// export const getPlanID = (dateScreen, movieId) => {
//   return async (dispatch, getState) => {
//     try {
//       const resTimes = await handleGetStartTimeAndRoom(dateScreen, movieId);
//       console.log("resTime: ", resTimes);
//       if (resTimes && resTimes.errCode === 0) {
//         const formattedData = resTimes.planScreens.map((item) => ({
//           roomId: item.roomId,
//           startTime: item.startTime,
//         }));
//         dispatch({
//           type: "GET_PLAN_TIMES_AND_ROOM",
//           payload: { formattedData },
//         });

//         const planIds = await Promise.all(
//           resTimes.planScreens.map(async (plan) => {
//             const res = await handleGetPlanId(
//               plan.roomId,
//               movieId,
//               plan.startTime,
//               dateScreen
//             );
//             console.log("resPlans: ", res);
//             if (res && res.errCode === 0) {
//               return res.planScreenMovieId.map((item) => item);
//             }
//             return [];
//           })
//         );

//         const formatted = planIds.flatMap((plans) => plans);
//         dispatch({
//           type: "GET_SELECTED_PLAN",
//           payload: { formatted },
//         });

//         console.log(">> planIds: ", planIds);
//       } else {
//         console.error("Dữ liệu không đúng định dạng hoặc không có dữ liệu.");
//       }
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//     }
//   };
// };

export const setSelectedSeat = (
  seat,
  roomType,
  seatType,
  isWeekend,
  timeFrame
) => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetCost(roomType, seatType, isWeekend, timeFrame);
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

export const clearSelectedSeatsAndTime = () => ({
  type: CLEAR_SELECTED_SEATS_AND_TIME,
});

export const setDate = (date) => ({
  type: SET_DATE,
  payload: { date },
});

export const setBank = (bank) => ({
  type: SET_BANK,
  payload: { bank },
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
