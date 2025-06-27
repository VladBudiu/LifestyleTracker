import '@mui/joy/styles';
import '@mui/joy/CircularProgress';

declare module '@mui/joy/styles' {
  interface Palette {
    calorie?: Palette['primary'];
  }
  interface PaletteVarOverrides {
    calorie: true;
  }
}
declare module '@mui/joy/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    calorie: true;
  }
}
