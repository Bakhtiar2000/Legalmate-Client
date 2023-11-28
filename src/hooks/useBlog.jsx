import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useBlog = () => {
    // const [axiosSecure] = useAxiosSecure();
    const { data: blogData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['blogData'],
        queryFn: async () => {
            const res = await fetch('/blogs.json');
            const data = await res.json();
            return data;
            // const res = await axiosSecure.get("blogs");
            // return res.data;
        },
    });
    return [blogData, loading, refetch];
};

export default useBlog;