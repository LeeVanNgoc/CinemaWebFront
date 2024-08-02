import MovieDetail from "./MovieDetail";
import "./scss/BookTicket.scss";
import DateChoice from "./DateChoice";

const BookTicket = () => {
  return (
    <div className="booking-container">
      <div className="custom-container">
        <div className="background-image"></div>
        <div className="movie-detail">
          <MovieDetail />
        </div>
      </div>
      <DateChoice />
    </div>
  );
};

export default BookTicket;
