import React from 'react';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500, grey900, grey800,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const paletteColors = {
  primary1Color: '#f8a640',
  // primary1Color: '#f58218',
  primary2Color: cyan700,
  primary3Color: grey900,
  accent1Color: grey900,
  accent2Color: grey100,
  accent3Color: grey500,
  textColor: darkBlack,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey300,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: cyan500,
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack,
};

const muiTheme = getMuiTheme({
  palette: paletteColors,
  appBar: {
    height: 50,
    color: grey800,
  },
  tabs: {
    backgroundColor: paletteColors.primary1Color,
    textColor: fade(paletteColors.alternateTextColor, 0.7),
    selectedTextColor: paletteColors.alternateTextColor,
  },
  button: {
    height: 50,
    minWidth: 88,
    iconButtonSize: spacing.iconSize * 2,
  },
});

export default muiTheme;
