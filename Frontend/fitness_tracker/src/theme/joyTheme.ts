import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },


  colorSchemes: {
    light: {
      palette: {
        calorie: {
          500: '#ffd43b',
          solidBg: '#ffd43b',
          solidColor: '#000',     
        },
      },
    },
    dark: {
      palette: {
        calorie: {
          500: '#ffd43b',
          solidBg: '#ffd43b',
          solidColor: '#000',
        },
      },
    },
  },

  components: {
    
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          [theme.breakpoints.down('sm')]: {
            '--Icon-fontSize': '0.8rem',
            '--Button-gap': '0.3rem',
            minHeight: '1.8rem',
            paddingInline: '0.6rem',
            fontSize: theme.vars.fontSize.xs,
          },
          [theme.breakpoints.between('sm', 'lg')]: {
            '--Icon-fontSize': '1rem',
            minHeight: '2.25rem',
            paddingInline: '1rem',
            fontSize: theme.vars.fontSize.sm,
          },
          [theme.breakpoints.up('lg')]: {
            '--Icon-fontSize': '1.4rem',
            minHeight: '3rem',
            paddingInline: '1.5rem',
            fontSize: theme.vars.fontSize.lg,
          },
        }),
      },
    },

    /* ──────── CircularProgress global + calorie override ──────── */
    JoyCircularProgress: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          
          '--CircularProgress-size': 'clamp(40px, 6vw, 100px)',
          '--CircularProgress-thickness': 'clamp(4px, 0.7vw, 8px)',

          
          ...(ownerState.color === 'calorie' && {
            '--CircularProgress-size': 'clamp(90px, 12vw, 180px)',
            '--CircularProgress-thickness': 'clamp(6px, 1.2vw, 18px)',
            
          }),
        }),
      },
    },
  },
});

export default theme;
