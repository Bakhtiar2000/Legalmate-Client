import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useCases = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: casesData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['casesData'],
        queryFn: async () => {
            const res = await fetch('/cases.json');
            const data = await res.json();
            return data;


            // const res = await axiosSecure.get("cases");
            // return res.data;
        },
    });
    return [casesData, loading, refetch];
};

export default useCases;