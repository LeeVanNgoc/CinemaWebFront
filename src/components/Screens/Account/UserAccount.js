import { useState, useEffect } from "react";
import { handleGetUserByCode } from "../Admin/Users/config";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "@mui/material";
import { jwtDecode } from "jwt-decode";
// import ModalEditUser from "./ModalEditUser";

const UserAccount = () => {
  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }
  const userCode = decoded.userCode;
  const [info, setInfo] = useState(null);
  const [openEditUser, setOpenEditUser] = useState(false);
  const handleOpenEditUser = () => {
    setOpenEditUser(true);
  };
  const handleCloseEditUser = () => {
    setOpenEditUser(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      let res = await handleGetUserByCode(userCode);
      console.log("res info >>>", res);
      if (res && res.errCode === 0) {
        setInfo(res.user);
      }
    };
    fetchData();
  }, [userCode]);

  return (
    <>
      <div className="relative mt-24 mx-24 text-white">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h5>Tài khoản của tôi</h5>
          {/* 
          <ModalEditUser
            isOpen={openEditUser}
            handleOpen={handleOpenEditUser}
            handleClose={handleCloseEditUser}
          /> */}
        </div>

        {info && (
          <div>
            <Table style={{ height: "auto", width: "60%" }}>
              <tbody>
                <tr>
                  <td>Họ</td>
                  <td>{info.lastName}</td>
                </tr>

                <tr>
                  <td>Tên</td>
                  <td>{info.firstName}</td>
                </tr>
                <tr>
                  <td>Số điện thoại</td>

                  <td>{info.phonenumber}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{info.email}</td>
                </tr>

                <tr>
                  <td>Tên tài khoản</td>
                  <td>{info.userName}</td>
                </tr>
                <tr>
                  <td>Năm sinh</td>
                  <td>{info.birthYear}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserAccount;
