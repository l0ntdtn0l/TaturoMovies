import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import AuthModal from '../common/AuthModal';
import GlobalLoading from '../common/GlobalLoading';

const MainLayout = () => {
    return (
        <>
            {/* Global loading */}
            <GlobalLoading />
            {/* Global loading */}

            {/* login modal */}
            <AuthModal />
            {/* login modal */}

            <Box display="flex" minHeight="100vh">
                {/* Header */}
                <Header />
                {/* Header */}

                {/* Main */}
                <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
                    <Outlet />
                </Box>
                {/* Main */}
            </Box>

            {/* Footer */}
            <Footer />
            {/* Footer */}
        </>
    );
};

export default MainLayout;
