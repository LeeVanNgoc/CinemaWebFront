import "./Price.scss";
import {
  Typography,
  Container,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import Header from "../../Common/Header/Header";

const Price = () => {
  function createData(
    name,
    standard1,
    vip1,
    sweetbox1,
    standard2,
    vip2,
    sweetbox2
  ) {
    return { name, standard1, vip1, sweetbox1, standard2, vip2, sweetbox2 };
  }

  const rows = [
    createData('Trước 12h', 55000, 65000, 140000, 70000, 80000, 170000),
    createData('Từ 12:00 đến trước 17:00', 70000, 75000, 160000, 80000, 85000, 180000),
    createData('Từ 17:00 đến trước 23:00', 80000, 85000, 180000, 90000, 95000, 200000),
  ];

  const rows3D = [
    createData('Trước 12h', 60000, 80000, 160000, 80000, 100000, 200000),
    createData('Từ 12:00 đến trước 17:00', 80000, 90000, 180000, 100000, 110000, 220000),
    createData('Từ 17:00 đến trước 23:00', 100000, 110000, 220000, 130000, 140000, 280000),
  ]

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number) + "đ";
  };

  return (
    <>
      <Header />
      <div className="price-container">
        <div className="section-name">
          <span>Giá vé</span>
        </div>
        <div className="section-description">
          <span>(Áp dụng từ ngày 01/06/2023)</span>
        </div>
        <Container className="prices" sx={{ textAlign: "left" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            1. GIÁ VÉ XEM PHIM 2D
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center" colSpan={3}>
                    Từ thứ 2 đến thứ 5
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Thứ 6, 7, CN và ngày Lễ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thời gian</TableCell>
                  <TableCell align="center">Standard</TableCell>
                  <TableCell align="center" className="vip">
                    VIP
                  </TableCell>
                  <TableCell align="center" className="sweetbox">
                    Sweetbox
                  </TableCell>
                  <TableCell align="center">Standard</TableCell>
                  <TableCell align="center" className="vip">
                    VIP
                  </TableCell>
                  <TableCell align="center" className="sweetbox">
                    Sweetbox
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(row.standard1)}
                    </TableCell>
                    <TableCell align="center" className="vip">
                      {formatCurrency(row.vip1)}
                    </TableCell>
                    <TableCell align="center" className="sweetbox">
                      {formatCurrency(row.sweetbox1)}
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(row.standard2)}
                    </TableCell>
                    <TableCell align="center" className="vip">
                      {formatCurrency(row.vip2)}
                    </TableCell>
                    <TableCell align="center" className="sweetbox">
                      {formatCurrency(row.sweetbox2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" sx={{ mb: 4, color: "darkgrey" }}>
            * Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ
            / vé
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            2. GIÁ VÉ XEM PHIM 3D
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center" colSpan={3}>
                    Từ thứ 2 đến thứ 5
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Thứ 6, 7, CN và ngày Lễ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thời gian</TableCell>
                  <TableCell align="center">Standard</TableCell>
                  <TableCell align="center" className="vip">
                    VIP
                  </TableCell>
                  <TableCell align="center" className="sweetbox">
                    Sweetbox
                  </TableCell>
                  <TableCell align="center">Standard</TableCell>
                  <TableCell align="center" className="vip">
                    VIP
                  </TableCell>
                  <TableCell align="center" className="sweetbox">
                    Sweetbox
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows3D.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(row.standard1)}
                    </TableCell>
                    <TableCell align="center" className="vip">
                      {formatCurrency(row.vip1)}
                    </TableCell>
                    <TableCell align="center" className="sweetbox">
                      {formatCurrency(row.sweetbox1)}
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(row.standard2)}
                    </TableCell>
                    <TableCell align="center" className="vip">
                      {formatCurrency(row.vip2)}
                    </TableCell>
                    <TableCell align="center" className="sweetbox">
                      {formatCurrency(row.sweetbox2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" sx={{ mb: 4, color: "darkgrey" }}>
            * Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ
            / vé
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            * Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử
            dụng dịch vụ xem phim tại rạp chiếu phim):
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            - Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16
            tuổi), người cao tuổi (công dân Việt Nam từ đủ 60 tuổi trở lên),
            người có công với cách mạng, người có hoàn cảnh đặc biệt khó khăn.
            <br />
            - Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.
            <br />- Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng,
            trẻ em dưới 0.7m đi kèm với người lớn.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Điều kiện:
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            - Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua online). -
            Các đối tượng khán giả trên phải xuất trình giấy tờ chứng minh khi
            mua vé xem phim và trước khi vào phòng chiếu. Cụ thể:
            <br />
            + Trẻ em (trường hợp trẻ em từ 14-16 tuổi), người cao tuổi: xuất
            trình "Căn cước công dân".
            <br />
            + Người có công với cách mạng: xuất trình giấy xác nhận theo quy
            định.
            <br />
            + Người có hoàn cảnh đặc biệt khó khăn: xuất trình "Giấy chứng nhận
            hộ nghèo".
            <br />+ Người khuyết tật: xuất trình "Giấy xác nhận khuyết tật".
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            * Ưu đãi cho học sinh, sinh viên từ 22 tuổi trở xuống: Đồng giá
            55.000đ /vé 2D cho tất cả các suất chiếu phim từ Thứ 2 đến Thứ 6
            (chỉ áp dụng cho hình thức mua vé trực tiếp tại quầy, không áp dụng
            với ghế đôi; Mỗi thẻ được mua 1 vé/ngày và vui lòng xuất trình thẻ
            U22 kèm thẻ HSSV khi mua vé).
            <br />
            <br />
            * Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại
            phim: P, K, T13, T16, T18, C. (Trường hợp vi phạm sẽ xử phạt theo
            Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).
            <br />
            <br />
            * Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim
            kết thúc sau 22h00 và không bán vé cho trẻ em dưới 16 tuổi đối với
            các suất chiếu phim kết thúc sau 23h00.
            <br />
            <br />* Áp dụng giá vé ngày Lễ, Tết cho các ngày:
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            - Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên Đán,
            Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, 2/9.
            <br />
            - Các ngày: 14/2, 8/3, 24/12.
            <br />- Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontWeight: "bold" }}>
            * Không áp dụng các chế độ ưu đãi, các chương trình khuyến mại khác
            vào các ngày 20/10, 20/11, Halloween 31/10, các ngày Lễ, Tết, suất
            chiếu sớm và suất chiếu đặc biệt.
            <br />
            <br />
            * Mua vé xem phim tập thẻ, hợp đồng khoán gọn: Phòng chiếu phim -
            (024) 35148647.
            <br />
            <br />
            * Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch
            vụ khác: Phòng Dịch vụ - (024) 35142856
            <br />
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA VÉ
            ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH TOÁN
            THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY VÉ.
            <br />
            <br />
            Rất mong Quý khán giả phối hợp thực hiện.
            <br />
            Xin trân trọng cảm ơn!
          </Typography>
          <Typography variant="body1">
            ----------------------------------------------------------
            <br />
            <br />- Mua vé xem phim tập thể, hợp đồng khoán gọn:
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontWeight: "bold" }}>
            Phòng Chiếu phim - (024) 35148647
          </Typography>
          <Typography variant="body1">
            - Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch
            vụ khác:
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontWeight: "bold" }}>
            Phòng Dịch vụ - (024) 35142856
            <br />
            <br />
            .TTCPQG
          </Typography>
        </Container>
      </div>
    </>
  );
};
export default Price;
