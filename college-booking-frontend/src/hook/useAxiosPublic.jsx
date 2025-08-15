import { useMemo } from "react";
import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = useMemo(() => {
        return axios.create({
            // baseURL: 'https://programming-hero-jp-vhgk.vercel.app/api/v1'
            baseURL: 'http://localhost:5000/api/v1'
        });
    }, []);
    return axiosPublic;
};

export default useAxiosPublic;