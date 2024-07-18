import Movie from "./Movie";
import "./BookTicket.scss";

const BookTicket = () => {
  return (
    <div className="custom-container">
      <div className="background-image"></div>
      <div className="movie-detail">
        <Movie />
      </div>
    </div>
  );
};

export default BookTicket;
