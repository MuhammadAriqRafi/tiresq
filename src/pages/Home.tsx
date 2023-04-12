import { Button, Box } from '@mui/material';
import { RxMagnifyingGlass } from 'react-icons/rx';

const Home = () => {
    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Button startIcon={<RxMagnifyingGlass />} variant="contained" sx={{ position: 'absolute', bottom: 64, left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '12px', p: '8px 16px' }}>
                Cari Tambal Ban
            </Button>
        </Box>
    );
};

export default Home;
