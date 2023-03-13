import React from 'react';

import Logo from '../common/Logo';
import Container from '../common/Container';

import { Paper, Stack, Box } from '@mui/material';

const Footer = () => {
    return (
        <Container>
            <Paper square={true} sx={{ backgroundImage: 'unset', padding: '2rem' }}>
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{ height: 'max-content' }}
                >
                    <Logo />
                    <Box>
                        <span>© 2023 Copyright: Nguyễn Đức Toàn </span>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Footer;
