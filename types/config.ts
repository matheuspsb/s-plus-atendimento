export type FontFamily = `'Inter', sans-serif` | `'Poppins', sans-serif` | `'Roboto', sans-serif`;
export type PresetColor = 'default';

export enum MenuOrientation {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
}

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark'
}

export enum ThemeDirection {
    LTR = 'ltr',
    RTL = 'rtl'
}

export type ConfigProps = {
  menuOrientation: MenuOrientation;
  miniDrawer: boolean;
  fontFamily: FontFamily;
  borderRadius: number;
  outlinedFilled: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  container: boolean;
};

export type CustomizationProps = {
    menuOrientation: MenuOrientation;
    miniDrawer: boolean;
    fontFamily: FontFamily;
    borderRadius: number;
    outlinedFilled: boolean;
    mode: ThemeMode;
    presetColor: PresetColor;
    themeDirection: ThemeDirection;
    container: boolean;
    onReset: () => void;
};
