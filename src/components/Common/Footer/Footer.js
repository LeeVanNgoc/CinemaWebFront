import * as React from "react";

const Footer = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <></>;
};
export default Footer;
