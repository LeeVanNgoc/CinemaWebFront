import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const ShowtimesCard = () => {
  const current = new Date();
  const date1 = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date2 = `${current.getDate() + 1}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date3 = `${current.getDate() + 2}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>{date1}</Button>
        <Button>{date2}</Button>
        <Button>{date3}</Button>
      </ButtonGroup>
    </>
  );
};

export default ShowtimesCard;
