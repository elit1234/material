import { useSelector } from "react-redux";
import { useEffect, useState } from "react";



const getDark = () => {
    const user = useSelector((state) => state && state.user && state.user);

    if(user && user.darkMode)
        return true
    
    else return false;

}

export  {getDark};