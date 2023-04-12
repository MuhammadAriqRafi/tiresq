import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar';
import History from './pages/History';
import Home from './pages/Home';
import './assets/index.css';

const theme = createTheme({
    typography: {
        fontFamily: 'Inter',
    },
});

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Box sx={{ overflow: 'hidden' }}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/history" element={<History />} />
                            <Route path="*" element={<h1>404 Page not found</h1>} />
                        </Routes>
                        <Navbar />
                    </Router>
                </Box>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;
