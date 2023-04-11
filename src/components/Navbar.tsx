import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import { RxHome, RxClock } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    return (
        <BottomNavigation
            sx={{ width: '100%', position: 'absolute', bottom: 0, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            showLabels>
            <BottomNavigationAction label="Home" icon={<RxHome size="1.5em" />} onClick={() => navigate('/')} />
            <BottomNavigationAction label="History" icon={<RxClock size="1.5em" />} onClick={() => navigate('/history')} />
        </BottomNavigation>
    );
};

export default Navbar;
