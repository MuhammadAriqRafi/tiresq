import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar';
import History from './pages/History';
import Home from './pages/Home';
import './assets/index.css';

const theme = createTheme({
    typography: {
        fontFamily: 'Inter',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/history" element={<History />} />
                    </Routes>
                    <Navbar />
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
