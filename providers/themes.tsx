import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { createTheme, Theme, ThemeOptions, ThemeProvider, TypographyVariantsOptions } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

import defaultConfig from '@/config/config';
import componentStyleOverrides from '@/themes/componentStyleOverrides';
import Palette from '@/themes/palette';
import customShadows from '@/themes/shadows';
import Typography from '@/themes/typography';
import { CustomShadowProps } from '@/types/default-theme';

interface Props {
  children: ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
    const { borderRadius, fontFamily, outlinedFilled, themeDirection, presetColor } = defaultConfig;

    const theme: Theme = useMemo<Theme>(() => Palette(presetColor), [presetColor]);

    const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
        () => Typography(theme, borderRadius, fontFamily),
        [theme, borderRadius, fontFamily]
    );
    const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(theme), [theme]);

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            direction: themeDirection,
            palette: theme.palette,
            mixins: {
                toolbar: {
                    minHeight: '48px',
                    padding: '16px',
                    '@media (min-width: 600px)': {
                        minHeight: '48px'
                    }
                }
            },
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [themeDirection, theme, themeCustomShadows, themeTypography]
    );

    const themes: Theme = createTheme(themeOptions);
    themes.components = useMemo(
        () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
        [themes, borderRadius, outlinedFilled]
    );

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
