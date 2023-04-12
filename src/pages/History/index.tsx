import { Box, Divider, Stack, Typography } from '@mui/material';
import useHistoryData, { HistoryItemData } from '../../hooks/useHistoryData';
import HistoryItem, { HistoryItemSkeleton } from './HistoryItem';
import Filter from './Filter';
import { useState } from 'react';
import { AxiosResponse } from 'axios';

const History = () => {
    //TODO: Continue creating filter status functionality

    const [status, setStatus] = useState<string>();

    const filterStatus = (data: AxiosResponse<any, any>) => {
        if (status === undefined) return data.data;
        else return data.data.filter((data: HistoryItemData) => data.status === status);
    };

    const {
        data: histories,
        isLoading,
        isError,
    } = useHistoryData({
        select: filterStatus,
    });

    return (
        <Stack marginTop={3}>
            <Box marginX={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h5" fontWeight="bold">
                        Riwayat
                    </Typography>
                </Stack>
                <Filter />
            </Box>

            {isError ? (
                <Typography variant="body1" fontWeight={700} textAlign="center" color="error">
                    Oops..., seems like there is an error fetching data
                </Typography>
            ) : isLoading ? (
                <Stack spacing={2} marginX={3}>
                    <HistoryItemSkeleton />
                    <HistoryItemSkeleton />
                    <HistoryItemSkeleton />
                </Stack>
            ) : (
                <Stack
                    spacing={2}
                    sx={{
                        px: 3,
                        overflowY: 'scroll',
                        maxHeight: 'calc(100vh - 24px - 32px - 80px - 56px)',
                        '&::-webkit-scrollbar': {
                            md: { display: 'none' },
                        },
                    }}>
                    {histories?.map(({ id, destination, distance, created_at, status }: HistoryItemData, index: number) => {
                        return (
                            <Box key={id}>
                                <HistoryItem destination={destination} distance={distance} timestamp={created_at} status={status} />
                                {index !== histories.length - 1 && <Divider />}
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </Stack>
    );
};

export default History;
