import { extendTheme } from '@chakra-ui/react';

const fonts = { mono: "'Menlo', monospace" };

const breakpoints = {
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
};

const theme = extendTheme({
    colors: {
        mint: '#94ecc5',
        blue: '#67a1a5',
        green: '#5CDB95',
        purple: '#948CC5',
        formBg: '#F5F5F5', // add this line
    },
    fonts,
    breakpoints,
    styles: {
        global: () => ({
            body: {
                bg: 'gray.200',
            },
        }),
    },
    components: {
        Button: {
            variants: {
                blue: {
                    bg: 'blue',
                    color: 'white',
                    size: 'md',
                    variant: 'solid',
                },
            },
        },
    },
});

export default theme;
