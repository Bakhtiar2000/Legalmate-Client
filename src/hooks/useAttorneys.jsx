import { useQuery } from "@tanstack/react-query";

const useAttorneys = () => {
    const { data: attorneysData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['attorneysData'],
        queryFn: async () => {
            const res = await fetch('/attorneys.json');
            const data = await res.json();
            return data;
        },
    });
    return [attorneysData, loading, refetch];
};

export default useAttorneys;