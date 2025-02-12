'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import FormLogin from '@/components/form/login/login';
import BackgroundPattern from '@/components/ui/background-pattern/BackgroundPattern';
import SliderRender from '@/components/ui/slider/Slider';
import LoginCardWrapper from '@/components/wrapper/login-card/LoginCardWrapper';
import LoginWrapper from '@/components/wrapper/login/LoginWrapper';
import { sliderText } from '@/constants/slider-text';
import Image from 'next/image';
import imgMain from '../../../assets/images/img-a2-login.svg';

const Login = () => {
    const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    return (
        <LoginWrapper>
            <Grid container justifyContent={{ xs: 'center', md: 'space-between' }} alignItems="center">
                <Grid item md={6} lg={7} xs={12} sx={{ minHeight: '100vh' }}>
                    <Grid
                        sx={{ minHeight: '100vh' }}
                        container
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        justifyContent={{ xs: 'center', md: 'space-between' }}
                    >
                        <Grid item sx={{ display: { xs: 'none', md: 'block' }, m: 3 }}>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ minHeight: { xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)' } }}
                        >
                            <Stack justifyContent="center" alignItems="center" spacing={5} m={2}>
                                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                                </Box>
                                <LoginCardWrapper border={downLG}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                                                    Olá, seja bem-vindo
                                                </Typography>
                                                <Typography variant="caption" fontSize="16px" textAlign={downMD ? 'center' : 'inherit'}>
                                                    Informe seus dados de acesso
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <FormLogin />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Não possui uma conta?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </LoginCardWrapper>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 3 }}>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern>
                        <Grid item container justifyContent="center">
                            <Grid item xs={12}>
                                <Grid item container justifyContent="center" sx={{ pb: 8 }}>
                                    <Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
                                        <SliderRender items={sliderText} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ position: 'relative' }}>
                                <Image
                                    alt="login image"
                                    src={imgMain}
                                    width={300}
                                    style={{
                                        maxWidth: '100%',
                                        margin: '0 auto',
                                        display: 'block',
                                        position: 'relative',
                                        zIndex: 5
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </BackgroundPattern>
                </Grid>
            </Grid> 
        </LoginWrapper>
    );
};

export default Login;
