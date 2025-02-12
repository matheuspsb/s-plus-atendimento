"use client";

import Avatar from '@/components/ui/avatar/Avatar';
import MainCard from '@/components/ui/cards/MainCard';
import Loader from '@/components/ui/loader/Loader';
import { appDrawerWidth, gridSpacing } from '@/constants/constant';
import { dispatch, useSelector } from '@/store';
import { getUser, getUserChats, insertChat } from '@/store/slices/chat';
import { History as HistoryProps } from '@/types/chat';
import { UserProfile } from '@/types/use-profile';
import { getImageUrl, ImagePath } from '@/utils/getImageUrl';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import EmojiPicker, { EmojiClickData, SkinTones } from 'emoji-picker-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AvatarStatus from './AvatarStatus';
import ChartHistory from './ChartHistory';
import ChatDrawer from './ChatDrawer';
import UserDetails from './UserDetails';

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' })(
    ({ theme, open }: { theme: Theme; open: boolean }) => ({
        flexGrow: 1,
        paddingLeft: open ? theme.spacing(3) : 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
        }),
        marginLeft: `-${appDrawerWidth}px`,
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0,
            marginLeft: 0
        },
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter
            }),
            marginLeft: 0
        })
    })
);

const ChatMainPage = () => {
    const theme = useTheme();
    const downLG = useMediaQuery(theme.breakpoints.down('lg'));

    const [loading, setLoading] = useState<boolean>(true);
    const scrollRef = useRef(null);

    useLayoutEffect(() => {
        if (scrollRef?.current) {
            // @ts-expect-error - to access scrollIntoView
            scrollRef.current.scrollIntoView();
        }
    });

    // handle right sidebar dropdown menu
    const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);
    const handleClickSort = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    // set chat details page open when user is selected from sidebar
    const [emailDetails, setEmailDetails] = React.useState(false);
    const handleUserChange = () => {
        setEmailDetails((prev) => !prev);
    };

    // toggle sidebar
    const [openChatDrawer, setOpenChatDrawer] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenChatDrawer((prevState) => !prevState);
    };

    // close sidebar when widow size below 'md' breakpoint
    useEffect(() => {
        setOpenChatDrawer(!downLG);
    }, [downLG]);

    const [user, setUser] = useState<UserProfile>({});
    const [data, setData] = React.useState<HistoryProps[]>([]);
    const chatState = useSelector((state) => state.chat);

    useEffect(() => {
        setUser(chatState.user);
    }, [chatState.user]);

    useEffect(() => {
        setData(chatState.chats);
    }, [chatState.chats]);

    useEffect(() => {
        const userCall = dispatch(getUser(1));
        Promise.all([userCall]).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        dispatch(getUserChats(user.name));
    }, [user]);

    // handle new message form
    const [message, setMessage] = useState('');
    const handleOnSend = () => {
        const d = new Date();
        setMessage('');
        const newMessage = {
            from: 'User1',
            to: user.name,
            text: message,
            time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setData((prevState) => [...prevState, newMessage]);
        dispatch(insertChat(newMessage));
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
        if (event?.key !== 'Enter') {
            return;
        }
        handleOnSend();
    };

    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setMessage(message + emojiObject.emoji);
    };

    const [anchorElEmoji, setAnchorElEmoji] = React.useState<any>(); // eslint-disable-line
    const handleOnEmojiButtonClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
        setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
    };

    const emojiOpen = Boolean(anchorElEmoji);
    const emojiId = emojiOpen ? 'simple-popper' : undefined;
    const handleCloseEmoji = () => {
        setAnchorElEmoji(null);
    };

    if (loading) return <Loader />;

    return (
        <Box sx={{ display: 'flex' }}>
            <ChatDrawer openChatDrawer={openChatDrawer} handleDrawerOpen={handleDrawerOpen} setUser={setUser} />
            <Main theme={theme} open={openChatDrawer}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs zeroMinWidth sx={{ display: emailDetails ? { xs: 'none', sm: 'flex' } : 'flex' }}>
                        <MainCard sx={{ bgcolor: 'grey.50' }}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={0.5}>
                                        <Grid item>
                                            <IconButton onClick={handleDrawerOpen} size="large" aria-label="chat menu collapse">
                                                <MenuRoundedIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                                                <Grid item>
                                                    <Avatar
                                                        alt={user.name}
                                                        src={user.avatar && getImageUrl(`${user.avatar}`, ImagePath.USERS)}
                                                    />
                                                </Grid>
                                                <Grid item sm zeroMinWidth>
                                                    <Grid container spacing={0} alignItems="center">
                                                        <Grid item xs={12}>
                                                            <Stack direction="row" alignItems="center" spacing={0.25}>
                                                                <Typography variant="h4">{user.name}</Typography>
                                                                {user.online_status && <AvatarStatus status={user.online_status} />}
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle2">Last seen {user.lastMessage}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm zeroMinWidth />
                                        <Grid item>
                                            <IconButton size="large" aria-label="chat user call">
                                                <CallTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="large" aria-label="chat user video call">
                                                <VideoCallTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={handleUserChange} size="large" aria-label="chat user information">
                                                <ErrorTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={handleClickSort} size="large" aria-label="chat user details change">
                                                <MoreHorizTwoToneIcon />
                                            </IconButton>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleCloseSort}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                            >
                                                <MenuItem onClick={handleCloseSort}>Name</MenuItem>
                                                <MenuItem onClick={handleCloseSort}>Date</MenuItem>
                                                <MenuItem onClick={handleCloseSort}>Ratting</MenuItem>
                                                <MenuItem onClick={handleCloseSort}>Unread</MenuItem>
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ mt: 2 }} />
                                </Grid>
                                <PerfectScrollbar
                                    style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 525 }}
                                >
                                    <Box sx={{ py: 3, pl: 4, pr: 1 }}>
                                        <ChartHistory theme={theme} user={user} data={data} />
                                        {/* // @ts-expect-error - to remove */}
                                        <span ref={scrollRef} />
                                    </Box>
                                </PerfectScrollbar>
                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <IconButton size="large" aria-label="attachment file">
                                                <AttachmentTwoToneIcon />
                                            </IconButton>
                                            <IconButton
                                                ref={anchorElEmoji}
                                                aria-describedby={emojiId}
                                                onClick={handleOnEmojiButtonClick}
                                                size="large"
                                                aria-label="emoji"
                                            >
                                                <MoodTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12} sm zeroMinWidth>
                                            <OutlinedInput
                                                id="message-send"
                                                fullWidth
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyPress={handleEnter}
                                                placeholder="Type a Message"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            disableRipple
                                                            color="primary"
                                                            onClick={handleOnSend}
                                                            aria-label="send message"
                                                        >
                                                            <SendTwoToneIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                aria-describedby="search-helper-text"
                                                inputProps={{ 'aria-label': 'weight' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Popper
                                id={emojiId}
                                open={emojiOpen}
                                anchorEl={anchorElEmoji}
                                disablePortal
                                style={{ zIndex: 1200 }}
                                modifiers={[
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [-20, 20]
                                        }
                                    }
                                ]}
                            >
                                <ClickAwayListener onClickAway={handleCloseEmoji}>
                                    <MainCard elevation={8} content={false}>
                                        <EmojiPicker onEmojiClick={onEmojiClick} defaultSkinTone={SkinTones.DARK} lazyLoadEmojis={true} />
                                    </MainCard>
                                </ClickAwayListener>
                            </Popper>
                        </MainCard>
                    </Grid>
                    {emailDetails && (
                        <Grid item sx={{ margin: { xs: '0 auto', md: 'initial' } }}>
                            <Box sx={{ display: { xs: 'block', sm: 'none', textAlign: 'right' } }}>
                                <IconButton onClick={handleUserChange} sx={{ mb: -5 }} size="large">
                                    <HighlightOffTwoToneIcon />
                                </IconButton>
                            </Box>
                            <UserDetails user={user} />
                        </Grid>
                    )}
                </Grid>
            </Main>
        </Box>
    );
};

export default ChatMainPage;
