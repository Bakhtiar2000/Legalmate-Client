import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";
import useAuth from "./useAuth";

const useIndividualPaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useAuth();
    console.log(currentUser.email)
    const { data: paymentsData = [], isLoading: paymentsLoading, refetch: paymentsRefetch } = useQuery({
        queryKey: ['paymentsData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`payment/history/${currentUser?.email}`);
            return res.data;
        },
    });
    return [paymentsData, paymentsLoading, paymentsRefetch];
};

export default useIndividualPaymentHistory;