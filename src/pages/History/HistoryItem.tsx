import { Chip, Stack, Typography } from '@mui/material';
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
                <Typography variant="h6" fontWeight="bold">
                    {destination}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                    {distance} Km
                </Typography>
                <Typography variant="body2">{timestamp}</Typography>
            </Stack>
            <Chip sx={{ borderRadius: '8px' }} label={formatCapitalFirstLetter(status)} color={statusColor.get(status)} />
        </Stack>
    );
};

export default HistoryItem;
