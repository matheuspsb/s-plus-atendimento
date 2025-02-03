"use client";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ApexCharts from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { IconBrandFacebook, IconBrandTwitter, IconBrandWhatsapp } from '@tabler/icons-react';
import MainCard from '../cards/MainCard';
import chartData from './market-share-area-chart';

const MarketShareAreaChartCard = () => {
    const theme = useTheme();

    const secondaryMain = theme.palette.success.main;
    const errorMain = theme.palette.secondary.main;
    const primaryDark = theme.palette.primary.dark;

    React.useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [secondaryMain, errorMain, primaryDark],
        };
        ApexCharts.exec(`market-share-area-chart`, 'updateOptions', newChartData);
    }, [secondaryMain, errorMain, primaryDark]);

    return (
        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
            <Box
                sx={{
                    p: 3
                }}
            >
                <Grid container direction="column" spacing={3}>
                    <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                            <Typography variant="h3">Número de atendimentos</Typography>
                        </Grid>
                        <Grid item xs zeroMinWidth />
                        <Grid item>
                            <TrendingDownIcon fontSize="large" color="error" sx={{ mt: 1 }} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h3">276</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ mt: -2.5, fontWeight: 400 }} color="inherit" variant="h5">
                            Aqui você pode acompanhar o número de atendimentos vindos das redes sociais
                        </Typography>
                    </Grid>
                    <Grid item container alignItems="center" spacing={3}>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: 'success.main',
                                            borderRadius: '12px',
                                            padding: 1,
                                            bgcolor: 'success.light'
                                        }}
                                    >
                                        <IconBrandWhatsapp stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">+ 45.36%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: 'primary.main',
                                            borderRadius: '12px',
                                            padding: 1,
                                            bgcolor: 'primary.light'
                                        }}
                                    >
                                        <IconBrandTwitter stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">- 50.69%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: 'secondary.main',
                                            borderRadius: '12px',
                                            padding: 1,
                                            bgcolor: 'secondary.light'
                                        }}
                                    >
                                        <IconBrandFacebook stroke={2} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">+ 16.85%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs zeroMinWidth />
                    </Grid>
                </Grid>
            </Box>
            <Chart {...chartData} />
        </MainCard>
    );
};
export default MarketShareAreaChartCard;
