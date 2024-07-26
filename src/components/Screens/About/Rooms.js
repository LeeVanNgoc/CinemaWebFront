import {
    Typography,
    Container,
    CardMedia,
  } from "@mui/material";

const Rooms = () => {
    return (
        <Container className="rooms" sx={{ mb:4, textAlign: "left" }}>
          <Typography variant="body1" paragraph>
          Khu chiếu phim 3 tầng với 14 phòng chiếu, âm thanh, ánh sáng chất lượng cao, Trung tâm Chiếu phim Quốc gia trình chiếu được các thể loại phim: 2D, 3D, không gian rộng rãi, bắt mắt. Các phòng chiếu phim của Trung tâm có tổng cộng 2.365 chỗ ngồi với hơn 60 suất chiếu/ ngày. Phòng lớn nhất 402 chỗ, phòng nhỏ nhất 98 chỗ. <br/>
          Hàng năm, Trung tâm Chiếu phim Quốc gia được đón tiếp nhiều đoàn khách tập thể đến xem phim từ các Trường Mẫu giáo, Tiểu học, THCS, THPT, đơn vị, công ty . . . quy mô phục vụ lên tới hơn 2000 khách/lượt. Các đối tác thân thiết của Trung tâm xem phim thường xuyên tại đây như trường Tiểu học Đoàn Thị Điểm, trường THCS Đoàn Thị Điểm, trường liên cấp Vinschool, trường Tiểu học Newton Goldmark, trường Tiểu học I-sắc Niu-tơn...
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017167.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Khu trưng bày điện ảnh – Biểu diễn nghệ thuật – Tổ chức sự kiện là khối nhà 5 tầng, mặt tiền nằm phía đường Láng Hạ. Tầng 1, 3, 4 có khả năng phục vụ lên tới hơn 1000 chỗ là nơi chuyên tổ chức các sự kiện, hội nghị, hội thảo, họp báo, tiệc cưới, tri ân khách hàng, sinh nhật... Tầng 2 Nhà hát với sức chứa hơn 300 chỗ là nơi khán giả có thể thưởng thức các chương trình nghệ thuật tạp kỹ đặc sắc diễn ra hàng tuần.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017168.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017169.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
        </Container>
    );
  };
export default Rooms;