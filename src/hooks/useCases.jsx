
import useAuth from './useAuth';
import useAxiosSecure from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useCases = () => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useAuth();
    const { data: casesData = [], isLoading: caseLoading, refetch } = useQuery({
        queryKey: ['casesData'],
        queryFn: async () => {

            const res = await axiosSecure.get(`/case/email/${currentUser?.email}`);
            return res.data;
        },
    });
    return [casesData, caseLoading, refetch];
};

export default useCases;