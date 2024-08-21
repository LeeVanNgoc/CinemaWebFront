import * as React from "react";
import "./Footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="icon-container">
          <span className="icon">
            <FacebookIcon />
          </span>
          <span className="icon">
            <YouTubeIcon />
          </span>
          <span className="icon">
            <InstagramIcon />
          </span>
          <span>
            <XIcon />
          </span>
        </div>
        <div>
          Cơ quan chủ quản: Nhóm
          <br />
          Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.
          <br />
          Giấy phép số: 224/GP- TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Yến
          Hoa - Giám đốc
          <br />
          Địa chỉ: 35 Lê Văn Thiêm, Quận Thanh Xuân, Tp. Hà Nội - Điện thoại:
          024.88888888
        </div>
      </div>
    </>
  );
};
export default Footer;
