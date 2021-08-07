import { useDispatch } from "react-redux";
import { useRouter } from "next/router"
import { logoutUser } from "../components/redux/store";
import { useEffect } from "react";

const Logout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const logout = async () => {
            await dispatch(logoutUser());
            await router.push("/");
        }
        logout();
    }, [])


    return null;

}

export default Logout;