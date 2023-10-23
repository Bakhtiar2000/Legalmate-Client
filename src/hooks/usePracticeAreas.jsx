import { useQuery } from "@tanstack/react-query";

const usePracticeAreas = () => {
    const { data: practiceAreasData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['practiceAreasData'],
        queryFn: async () => {
            const res = await fetch('/practiceAreas.json');
            const data = await res.json();
            return data;
        },
    });
    return [practiceAreasData, loading, refetch];
};

export default usePracticeAreas;