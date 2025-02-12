import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AvatarStatus from './AvatarStatus';

import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';

import images1 from '@/assets/images/pages/img-catalog1.png';
import images2 from '@/assets/images/pages/img-catalog2.png';
import images3 from '@/assets/images/pages/img-catalog3.png';
import SubCard from '@/components/ui/sub-card/SubCard';
import { gridSpacing } from '@/constants/constant';
import { UserProfile } from '@/types/use-profile';
import { getImageUrl, ImagePath } from '@/utils/getImageUrl';

interface UserDetailsProps {
    user: UserProfile;
}

const UserDetails = ({ user }: UserDetailsProps) => {
    return (
        <Grid container spacing={gridSpacing} sx={{ width: '100%', maxWidth: 300 }}>
            <Grid item xs={12}>
                <Card>
                    <CardContent
                        sx={{
                            textAlign: 'center',
                            bgcolor: 'primary.light'
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Avatar
                                    alt={user.name}
                                    src={user.avatar && getImageUrl(`${user.avatar}`, ImagePath.USERS)}
                                    sx={{
                                        m: '0 auto',
                                        width: 130,
                                        height: 130,
                                        border: '1px solid',
                                        borderColor: 'primary.main',
                                        p: 1,
                                        bgcolor: 'transparent'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AvatarStatus status={user.online_status!} />
                                <Typography variant="caption">{user?.online_status!.replaceAll('_', ' ')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">{user.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">{user.role}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <SubCard sx={{ bgcolor: 'grey.50' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Information</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        <PinDropTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} /> 32188 Sips
                                        Parkways, U.S
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        <PhoneTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} /> 995-250-1803
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        <EmailTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />{' '}
                                        O’Keefe@codedtheme.com
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">Attachment</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <CardMedia component="img" image={images1.src} title="image" sx={{ width: 42, height: 42 }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">File Name.jpg</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">4/16/2021 07:47:03</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <CardMedia component="img" image={images2.src} title="image" sx={{ width: 42, height: 42 }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">File Name.ai</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">4/16/2021 07:47:03</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <CardMedia component="img" image={images3.src} title="image" sx={{ width: 42, height: 42 }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">File Name.pdf</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">4/16/2021 07:47:03</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default UserDetails;
