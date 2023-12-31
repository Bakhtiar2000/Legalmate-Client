import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxios';

const useUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: userData = [], isLoading: UserDataLoading, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosSecure('/users');
            return res.data;
        },
    });
    return [userData, UserDataLoading, refetch];
};

export default useUsers;