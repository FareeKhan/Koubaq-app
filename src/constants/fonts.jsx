import { I18nManager, Platform } from 'react-native';

const getFont = (rtlFont, ltrFont) => (I18nManager.isRTL ? ltrFont : rtlFont);

export const fonts = {
  light: getFont('DMSans-Light', 'Cairo-Light'),
  regular: getFont('DMSans-Regular', 'Cairo-Regular'),
  medium: getFont('DMSans-Medium', 'Cairo-Medium'),
  semiBold: getFont('DMSans-SemiBold', 'Cairo-SemiBold'),
  extraLight: getFont('DMSans-ExtraLight', 'Cairo-ExtraLight'),
  black: getFont('DMSans-Black', 'Cairo-Black'),
  bold: getFont('DMSans-Bold', 'Cairo-Bold'),
};
