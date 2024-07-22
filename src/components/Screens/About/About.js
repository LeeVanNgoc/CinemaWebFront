import {
  Typography,
  ButtonGroup,
  Button,
  Container,
  CardMedia,
} from "@mui/material";
import "./About.scss";

const About = () => {
  return (
    <div className="info-container">
      <div className="section-name">
        <span>Giới thiệu</span>
      </div>
      <ButtonGroup
        sx={{
          variant: "contained",
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Button>Giới thiệu</Button>
        <Button>Dịch vụ</Button>
        <Button>Phòng chiếu - Nhà hát</Button>
        <Button>NCC - Điểm hẹn cuối tuần</Button>
      </ButtonGroup>
      <Container className="information">
        <Typography variant="body1" paragraph>
          Trung tâm Chiếu phim Quốc gia (tên giao dịch quốc tế là National
          Cinema Center) là đơn vị sự nghiệp công lập, trực thuộc Bộ Văn hóa,
          Thể thao và Du lịch, có chức năng tổ chức chiếu phim phục vụ các nhiệm
          vụ chính trị, xã hội, hợp tác quốc tế; trưng bày điện ảnh; điều tra xã
          hội học về nhu cầu khán giả để phục vụ cho công tác định hướng phát
          triển ngành điện ảnh.
        </Typography>
        <Typography variant="body1">
          Ngày thành lập: 29/12/1997
          <br />
          Trụ sở: 87 Láng Hạ, quận Ba Đình, thành phố Hà Nội.
          <br />
          Website: <a href="http://localhost:3000/">chieuphimquocgia.com.vn</a>
          <br />
          Email:{" "}
          <a href="mailto:lminhvu.work@gmail.com">lminhvu.work@gmail.com</a>
          <br />
          Số điện thoại: 024.3514 1791 / 024.3514 8647
        </Typography>
        <CardMedia
          component="img"
          image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017151.jpg"
          alt="Infographic"
          sx={{ height: "100%", width: "auto" }}
        />
        <Typography variant="h6" gutterBottom>
          Bộ máy tổ chức của Trung tâm Chiếu phim Quốc gia
        </Typography>
        <CardMedia
          component="img"
          image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017146.png"
          alt="Infographic"
          sx={{
            height: "400px",
            width: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Container>
    </div>
  );
};

export default About;
