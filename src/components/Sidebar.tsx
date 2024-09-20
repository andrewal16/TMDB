import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsLoggedIn, selectUsername } from "../reducer/userSlice";
const Sidebar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const username = useSelector(selectUsername);
  

  return (
    <>
    <div className="flex justify-center items-center font-bold p-7 bg-slate-400 text-slite-50">
        {username ? "Welcome, " + username : "Hello, Please login first"}    </div>
      <div className="menu p-9">
        <ul className="menu-list">
          <li>
            <button className="btn btn-primary w-full">
              <Link to ="/movie">Movie List</Link>
            </button>
          </li>
          <li className="mt-4">
            <button className="btn btn-success w-full">
              <Link to ="/mycollection">My Collection</Link>
            </button>
          </li>
        </ul>
      </div>
      </>
  );
};

export default Sidebar;
