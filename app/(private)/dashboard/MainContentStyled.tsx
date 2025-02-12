import { drawerWidth } from '@/constants/constant';
import { styled, Theme } from '@mui/material/styles';

interface MainStyleProps {
    theme: Theme;
    open: boolean;
    borderRadius: number;
}

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

const MainContentStyled = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'borderRadius' && prop !== 'menuOrientation'
})(({ theme, open, borderRadius }: MainStyleProps) => ({
    backgroundColor: theme.palette.grey[100],
    minWidth: '1%',
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: 20,
    marginTop: 88,
    marginRight: 20,
    borderRadius: `${borderRadius}px`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...(!open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter + 200
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 72),
            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: 88
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter + 200
        }),
        marginLeft: 0,
        marginTop: 88,
        width: `calc(100% - ${drawerWidth - 72}px)`,
        [theme.breakpoints.up('md')]: {
            marginTop: 80
        }
    }),
    [theme.breakpoints.down('md')]: {
        marginLeft: 20,
        padding: 16,
        marginTop: 88,
        ...(!open && {
            width: `calc(100% - ${drawerWidth}px)`
        })
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
        marginRight: 10
    }
}));

export default MainContentStyled;
