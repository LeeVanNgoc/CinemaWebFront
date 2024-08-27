import { Grid } from "@mui/material";
import ScreeningCount from "../Statistic/ScreeningCount";
import TotalRenvenue from "../Statistic/TotalRenvenue";
import MovieRevenue from "../Statistic/MovieRevenue";
import BookedTickets from "../Statistic/BookedTickets";
import TotalMovies from "../Statistic/TotalMovies";
import TotalUsers from "../Statistic/TotalUsers";
import AvgAge from "../Statistic/AvgAge";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "#0d0F11",
        borderRadius: "16px",
      }}
    >
      <div>
        <div className="flex justify-evenly">
          <span>
            <TotalRenvenue />
          </span>
          <span>
            <AvgAge />
          </span>
          <span>
            <TotalUsers />
          </span>
          <span>
            <TotalMovies />
          </span>
          <span>
            <BookedTickets />
          </span>
        </div>
        <div className="mt-12 mx-10">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <ScreeningCount />
            </Grid>
            <Grid item xs={6}>
              <MovieRevenue />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="h-3 mb-3"></div>
    </div>
  );
};

export default Dashboard;
