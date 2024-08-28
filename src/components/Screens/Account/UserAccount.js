import * as React from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import { FormControl } from "@mui/base/FormControl";
import { StyledInput, HelperText, Label } from "./style";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Stack from "@mui/joy/Stack";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useState, useEffect } from "react";
import { handleEditUser, handleGetUserByCode } from "../Admin/Users/config";
import { jwtDecode } from "jwt-decode";
import Header from "../../Common/Header/Header";
import { setRender } from "../../../redux/renderAction";
import { useDispatch, useSelector } from "react-redux";

export default function UserAccount() {
  const dispatch = useDispatch();
  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }
  const userCode = decoded.userCode;
  const isRender = useSelector((state) => state.render.isRender);

  const [info, setInfo] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [userName, setUserName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const handleUpdateUser = async () => {
    await handleEditUser(
      userCode,
      firstName,
      lastName,
      userName,
      phonenumber,
      birthYear
    );
    dispatch(setRender(true));
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
  }, [userCode, isRender]);

  return (
    <>
      <Header />

      <Card
        variant="outlined"
        sx={{
          marginTop: "80px",
          maxHeight: "max-content",
          maxWidth: "fit-content",
          mx: "auto",
          // to make the demo resizable
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Thông tin tài khoản
        </Typography>
        <Divider inset="none" />
        {info && (
          <CardContent
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
              gap: 1.5,
            }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={180}
                sx={{ flex: 1, borderRadius: "100%" }}
              ></AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 180,
                  top: 210,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <Label>Họ</Label>
                <FormControl
                  defaultValue={info.lastName}
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <StyledInput
                    size="sm"
                    onChange={(e) => setLastName(e.target.value)}
                  />{" "}
                </FormControl>
                <Label>Tên</Label>
                <FormControl
                  defaultValue={info.firstName}
                  required
                  sx={{ flex: 1 }}
                >
                  <StyledInput
                    size="sm"
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <HelperText />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl defaultValue={info.userName}>
              <Label>Tên tài khoản</Label>
              <StyledInput
                size="sm"
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl defaultValue={info.email} sx={{ gridColumn: "1/-1" }}>
              <Label>Email</Label>
              <StyledInput
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                sx={{ flexGrow: 1 }}
                readOnly
              />
            </FormControl>
            <FormControl defaultValue={info.phonenumber}>
              <Label>Số điện thoại</Label>
              <StyledInput onChange={(e) => setPhonenumber(e.target.value)} />
            </FormControl>

            <FormControl
              defaultValue={info.birthYear}
              sx={{ gridColumn: "1/-1" }}
            >
              <Label>Năm sinh</Label>
              <StyledInput onChange={(e) => setBirthYear(e.target.value)} />
            </FormControl>
            {/* <FormControl sx={{ gridColumn: "1/-1" }}>
              <Label>Mật khẩu</Label>
              <StyledInput value={info.password} />
            </FormControl> */}
            <CardActions sx={{ gridColumn: "1/-1" }}>
              <Button
                variant="solid"
                sx={{ backgroundColor: "#dc1313f0" }}
                onClick={() => handleUpdateUser()}
              >
                Cập nhật
              </Button>
            </CardActions>
          </CardContent>
        )}
      </Card>
    </>
  );
}
