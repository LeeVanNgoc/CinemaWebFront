import MovieDetail from "./MovieDetail";
import "./BookTicket.scss";

const BookTicket = () => {
  return (
    <div className="custom-container">
      <div className="background-image"></div>
      <div className="movie-detail">
        <MovieDetail />
      </div>
    </div>
  );
};

export default BookTicket;
