import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const checkAdminToken = () => {
    const isLoggedIn = useSelector((state) => state.user.username && state.user.token ? true : false);

    if(!isLoggedIn) return false;
    else return true;
}

const getUser = () => {
    const user = useSelector((state) => state && state.user && state.user);

    if(user) {
        return user;
    }
    else return false;

}

export  {checkAdminToken, getUser};