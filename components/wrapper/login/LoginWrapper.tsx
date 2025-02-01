"use client";
import { styled } from '@mui/material/styles';

const LoginWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    minHeight: '100vh',
    [theme.breakpoints.down('lg')]: {
        backgroundColor: theme.palette.grey[100]
    }
}));

export default LoginWrapper;