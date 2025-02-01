import { AuthSliderProps } from '@/types/slider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider, { Settings } from 'react-slick';

const SliderRender = ({ items }: { items: AuthSliderProps[] }) => {
    const settings: Settings = {
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {items.map((item, i) => (
                <Grid key={i} container direction="column" alignItems="center" spacing={3} textAlign="center">
                    <Grid item>
                        <Typography variant="h1">{item.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2">{item.description}</Typography>
                    </Grid>
                </Grid>
            ))}
        </Slider>
    );
};

export default SliderRender;
