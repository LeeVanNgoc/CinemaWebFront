import MovieDetail from "./MovieDetail";
import "./scss/BookTicket.scss";
import DateChoice from "./DateChoice";
import { useSelector } from "react-redux";
import Header from "../../Common/Header/Header";

const BookTicket = () => {
  const movie = useSelector((state) => state.manageMovies.selectedMovie);
  return (
    <>
      <Header />
      <div className="booking-container">
        <div className="custom-container">
          <div className="background-image">
            <img src={movie.image} />
          </div>
          <div className="movie-detail">
            <MovieDetail />
          </div>
        </div>
        <DateChoice />
      </div>
    </>
  );
};

export default BookTicket;
