import { useEffect, useState } from "react";
import { handleGetListUsers } from "../Users/config";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setRender } from "../../../../redux/renderAction";

export default function TotalUsers() {
  const dispatch = useDispatch();

  const isRender = useSelector((state) => state.render.isRender);
  const [users, setUsers] = useState(0);
  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }

  const fetchUsers = async () => {
    try {
      let res = await handleGetListUsers();
      console.log("get users: ", res);
      if (res && res.users) {
        const formattedData = res.users.filter((item) =>
          item.city.includes(decoded.city)
        ).length;
        setUsers(formattedData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (users === 0) {
      fetchUsers();
    }

    if (isRender) {
      fetchUsers();
      setTimeout(() => {
        dispatch(setRender(false));
      }, 0);
    }
  }, [isRender]);

  return (
    <div
      className=" box-border translate-y-6 rounded-2xl p-6 text-white flex flex-row gap-3"
      style={{ background: "linear-gradient(to bottom, #262C36, #1B1E24)" }}
    >
      <img src={require("../Dashboard/assets/UserIcon.png")} className="w-16" />
      <div className="flec flex-col">
        Tổng người dùng
        {users && <p className="font-bold text-2xl">{users}</p>}
      </div>
    </div>
  );
}
