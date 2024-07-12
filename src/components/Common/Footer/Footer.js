import * as React from "react";
import "./Footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="nav-container">
          <span className="nav">Chính sách</span>
          <span className="nav">Lịch chiếu</span>
          <span className="nav">Tin tức</span>
          <span className="nav">Giá vé</span>
          <span className="nav">Hỏi đáp</span>
          <span>Liên hệ</span>
        </div>
        <div className="icon-container">
          <span className="icon">
            <FacebookIcon />
          </span>
          <span>
            <YouTubeIcon />
          </span>
        </div>
        <div>
          Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH
          <br />
          Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.
          <br />
          Giấy phép số: 224/GP- TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức
          Tùng – Giám đốc.
          <br />
          Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại:
          024.35141791
        </div>
      </div>
    </>
  );
};
export default Footer;
