import { useQuery } from "@tanstack/react-query";

const useOurReviews = () => {
    const { data: ourReviewsData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['ourReviewsData'],
        queryFn: async () => {
            const res = await fetch('/ourReviews.json');
            const data = await res.json();
            return data;
        },
    });
    return [ourReviewsData, loading, refetch];
};

export default useOurReviews;