import { Outlet, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../store/atoms";

export const PrivateRoutes =() => {
  const [userInfo] = useAtom(userAtom)

  const auth = userInfo.email != "" ? true : false;
  return(
    auth ? <Outlet/> : <Navigate to="/login"/>
  )
}