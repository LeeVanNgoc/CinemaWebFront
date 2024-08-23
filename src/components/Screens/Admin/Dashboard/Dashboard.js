import ScreeningCount from "../Statistic/ScreeningCount";
import { Grid } from "@mui/material";
import "./Dashboard.scss";
import TotalRenvenue from "../Statistic/TotalRenvenue";
import MovieRevenue from "../Statistic/MovieRevenue";

const Dashboard = () => {
  return (
    <div className="my-24">
      <div className="flex flex-row justify-evenly">
        <span
          className="cinema bg-slate-200 rounded-md"
          style={{ backgroundColor: "#3D3B40" }}
        >
          <TotalRenvenue />
        </span>
        <span
          className="cinema bg-slate-200 rounded-md"
          style={{ backgroundColor: "#3D3B40" }}
        ></span>
        <span
          className="cinema bg-slate-200 rounded-md"
          style={{ backgroundColor: "#3D3B40" }}
        ></span>{" "}
      </div>
      <div className="mt-12 mx-10">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ScreeningCount />
          </Grid>
          <Grid item xs={6}>
            <MovieRevenue />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
