import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { loginUser } from "../reducer/userSlice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const LoginPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { username, sessionId, error } = useSelector(
    (state: RootState) => state.user
  );
  const [inputUsername, setInputUsername] = useState(username);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(
        loginUser({ username: inputUsername, password })
      ).unwrap();
      if (result.sessionId) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/movie");
        });
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 shadow-xl ">
      <div className="w-96 shadow-lg bg-blue-500 rounded-lg">
      <div className=" card-body">
        <h2 className="card-title">Login</h2>
        <div className="form-control">
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Username"
            disabled={isLoading}
            className="input input-bordered mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading}
            className="input input-bordered mb-4"
          />
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
