import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

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
})

export default theme
