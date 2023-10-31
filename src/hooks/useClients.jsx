import useAxiosSecure from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useClients = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: clientsData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['clientsData'],
        queryFn: async () => {
            const res = await fetch('/clients.json');
            const data = await res.json();
            return data;

            // const res = await axiosSecure.get("clients");
            // return res.data;
        },
    });
    return [clientsData, loading, refetch];
};

export default useClients;