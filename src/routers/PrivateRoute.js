import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user.account);
  if (user && !user.auth) {
    return (
      <>
        <p>Bạn không có quyền truy cập trang này!</p>
      </>
    );
  }

  return <>{props.children}</>;
};
export default PrivateRoute;
