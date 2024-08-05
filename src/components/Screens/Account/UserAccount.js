import { useState, useEffect } from "react";
import { handleGetUserById } from "../Admin/Users/config";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Table } from "@mui/material";

const UserAccount = () => {
  const userId = useSelector((state) => state.user.account.id);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let res = await handleGetUserById(userId);
      console.log("res info >>>", res);
      if (res && res.errCode === 0) {
        setInfo(res.user);
      }
    };

    fetchData();
  }, [userId]);

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

          {/* <ModalUpdateInfo item={info}></ModalUpdateInfo> */}
          <Button>Sửa</Button>
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
