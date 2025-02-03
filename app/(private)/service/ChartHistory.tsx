import { gridSpacing } from '@/constants/constant';
import { History } from '@/types/chat';
import { UserProfile } from '@/types/use-profile';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

interface ChartHistoryProps {
    data: History[];
    theme: Theme;
    user: UserProfile;
}

const ChartHistory = ({ data, theme, user }: ChartHistoryProps) => (
    <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
            {data.map((history, index) => (
                <React.Fragment key={index}>
                    {history.from !== user.name ? (
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={2} />
                                <Grid item xs={10}>
                                    <Card
                                        sx={{
                                            display: 'inline-block',
                                            float: 'right',
                                            bgcolor: theme.palette.primary.light
                                        }}
                                    >
                                        <CardContent sx={{ p: 2, pb: '16px !important', width: 'fit-content', ml: 'auto' }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant="body2"
                                                        color={''}
                                                    >
                                                        {history.text}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        align="right"
                                                        variant="subtitle2"
                                                        color={''}
                                                    >
                                                        {history.time}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={7}>
                                    <Card
                                        sx={{
                                            display: 'inline-block',
                                            float: 'left',
                                            bgcolor: 'secondary.light'
                                        }}
                                    >
                                        <CardContent sx={{ p: 2, pb: '16px !important' }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">{history.text}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography align="right" variant="subtitle2">
                                                        {history.time}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </React.Fragment>
            ))}
        </Grid>
    </Grid>
);

export default ChartHistory;
