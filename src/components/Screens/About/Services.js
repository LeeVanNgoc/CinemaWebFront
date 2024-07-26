import {
    Typography,
    Container,
    CardMedia,
  } from "@mui/material";

const Services = () => {
    return (
        <Container className="services" sx={{ textAlign: "left" }}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Trung tâm Chiếu phim Quốc gia là một địa chỉ quen thuộc và yêu mến đối với những người yêu điện ảnh Thủ đô và cả nước, là điểm đến giải trí cực kỳ hấp dẫn dành cho mọi lứa tuổi với nhiều hoạt động dịch vụ đa dạng.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          1. Hoạt động điện ảnh:
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Chiếu phim phục vụ các nhiệm vụ chính trị, xã hội. ảnh Thủ đô và cả nước, là điểm đến giải trí cực kỳ hấp dẫn dành cho mọi lứa tuổi với nhiều hoạt động dịch vụ đa dạng.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017150.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Tổ chức, thực hiện Liên hoan phim, Tuần lễ phim trong nước, Khu vực và Quốc tế.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017152.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Chiếu phim phục vụ khán giả.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017154.jpg"
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
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017157.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Trưng bày điện ảnh.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017159.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4, fontWeight: 'bold' }}>
            2. Hoạt động biểu diễn nghệ thuật, ca nhạc tạp kỹ:
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017161.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            3. Dịch vụ khác:
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Tổ chức sự kiện (Sự kiện, hội nghị hội thảo, ra mắt phim...).
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017162.jpg"
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
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017163.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Vui chơi giải trí.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017164.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Ẩm thực.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017165.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
          - Quảng cáo thương mại.
          </Typography>
          <CardMedia
            component="img"
            image="https://api.chieuphimquocgia.com.vn/Content/Images/Master/0017166.jpg"
            alt="Infographic"
            sx={{
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
            Trung tâm Chiếu phim Quốc gia rất hân hạnh được đón tiếp và phục vụ quý khách hàng.
          </Typography>
        </Container>
    );
  };
export default Services;