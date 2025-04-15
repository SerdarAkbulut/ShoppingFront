import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/token/tokenSlice";

const TokenLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return null;
};

export default TokenLoader;
