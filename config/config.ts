import { ConfigProps, MenuOrientation, ThemeDirection, ThemeMode } from "@/types/config";

const defaultConfig: ConfigProps = {
    menuOrientation: MenuOrientation.VERTICAL,
    miniDrawer: false,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    mode: ThemeMode.LIGHT,
    presetColor: 'default',
    themeDirection: ThemeDirection.LTR,
    container: false
};

export default defaultConfig;