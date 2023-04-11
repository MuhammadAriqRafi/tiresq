import { Box, Divider, Stack, Typography } from '@mui/material';
import { RxArrowLeft } from 'react-icons/rx';
import historyItemData from '../../data/HistoryItemData.json';
import { useNavigate } from 'react-router-dom';
import HistoryItem from './HistoryItem';
import Filter from './Filter';

const History = () => {
    const navigate = useNavigate();

    return (
        <Stack marginX={3} marginTop={3}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                    Riwayat
                </Typography>
            </Stack>

            <Filter />

            <Stack spacing={2}>
                {historyItemData.map(({ id, destination, distance, created_at, status }) => (
                    <Box key={id}>
                        <HistoryItem destination={destination} distance={distance} timestamp={created_at} status={status} />
                        <Divider />
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
};

export default History;
