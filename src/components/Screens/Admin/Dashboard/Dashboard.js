import ScreeningCount from "../Statistic/ScreeningCount";
import { Grid } from "@mui/material";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="mt-24">
      {/* <div className="flex flex-row justify-evenly">
        <span className="cinema bg-slate-200 rounded-md">Rạp Hà Nội</span>
        <span className="cinema bg-slate-200 rounded-md">Rạp Hà Nội</span>
        <span className="cinema bg-slate-200 rounded-md">Rạp Hà Nội</span>{" "}
      </div> */}
      <div className="mt-12 bg-slate-200 mx-10">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ScreeningCount />
          </Grid>
          <Grid item xs={6}>
            <ScreeningCount />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
