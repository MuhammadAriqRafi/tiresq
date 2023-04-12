import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface HistoryItemData {
    id: number;
    destination: string;
    distance: number;
    created_at: string;
    status: string;
}

interface Props {
    select?: (data: any) => any;
}

const fetchHistories = () => axios.get('http://localhost:3000/histories');

const useHistoryData = (props?: Props) => {
    return useQuery(['histories'], fetchHistories, {
        refetchOnWindowFocus: false,
        select: props?.select ?? ((data) => data.data),
    });
};

export default useHistoryData;
