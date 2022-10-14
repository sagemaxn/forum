import { extendTheme } from '@chakra-ui/react'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

const theme = extendTheme({
  colors: {
    mint: '#94ecc5' ,
    blue: "#67a1a5",
    green: "#5CDB95",
    purple: "#948CC5"
  },
  fonts,
  breakpoints,
  styles: {
    global: (props) => ({
      body: {
       bg: "green"
      }
    })
  },
  components: {
    Button: {
      variants: {
        'blue': {
          bg: 'blue',
          color: 'white',
          size: 'md',
          variant: 'solid'
        },
      },
      defaultProps: {
        size: 'md', // default is md
        variant: 'solid', // default is solid
        colorScheme: 'gray', // default is gray
      },
    },
  },
})

export default theme
