import { Button, Box } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';

const Home = () => {
    return (
        <Box sx={{ height: '100vh', width: '100%', border: '2px solid red' }}>
            <Button startIcon={<AiOutlineSearch />} variant="outlined" sx={{ position: 'absolute', bottom: 64, left: '50%', transform: 'translate(-50%, -50%)' }}>
                Cari Tambal Ban
            </Button>
        </Box>
    );
};

export default Home;
