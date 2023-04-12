import { Box, Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { formatCapitalFirstLetter } from '../../utils/formatCapitalFirstLetter';

interface Props {
    destination: string;
    distance: number;
    timestamp: string;
    status: string;
}

const statusColor = new Map();
statusColor.set('finish', 'success');
statusColor.set('cancelled', 'error');
statusColor.set('pending', 'warning');

const HistoryItem = ({ destination, distance, timestamp = '-', status }: Props) => {
    return (
        <Stack marginBottom={2} direction="row" justifyContent="space-between">
            <Stack spacing={1}>
                <Typography variant="body1" fontWeight="bold">
                    {destination}
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="grey.600">
                    {distance} Km
                </Typography>
                <Typography variant="caption">{timestamp}</Typography>
            </Stack>

            <Chip sx={{ borderRadius: '8px' }} size="small" label={<Typography variant="caption">{formatCapitalFirstLetter(status)}</Typography>} color={statusColor.get(status)} />
        </Stack>
    );
};

export const HistoryItemSkeleton = () => {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" paddingBottom={2}>
                <Stack width="50%">
                    <Skeleton variant="text" width="100%" animation="wave" />
                    <Skeleton variant="text" width="50%" animation="wave" />
                    <Skeleton variant="text" width="25%" animation="wave" />
                </Stack>
                <Skeleton variant="text" width="25%" animation="wave" />
            </Stack>
            <Divider />
        </Box>
    );
};

export default HistoryItem;
