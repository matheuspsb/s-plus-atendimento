import AuthPattern from '@/assets/images/img-a2-grid.svg';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { ReactElement } from 'react';

const BackgroundPattern = ({ children }: { children: ReactElement | ReactElement[] }) => {
    return (
        <Box
            component="span"
            sx={{
                display: 'flex',
                minHeight: '100%',
                height: '100vh',
                bgcolor: 'background.paper',
                position: 'absolute',
                overflow: 'hidden',
                m: '0 0 0 auto',
                p: '100px 0',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                '& > *': {
                    position: 'relative',
                    zIndex: 5
                },
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    bottom: 0,
                    bgcolor: 'grey.100',
                    opacity: 0.9
                }
            }}
        >
            {children}
            <CardMedia
                component="img"
                sx={{ zIndex: 1, position: 'absolute', bottom: 0, right: 0, width: 1 }}
                src={AuthPattern}
                alt="pattern"
            />
        </Box>
    );
};

export default BackgroundPattern;
