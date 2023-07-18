import { Box, keyframes } from '@chakra-ui/react';

const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(359deg)}
`;

const animation = `2s linear infinite ${spin}`;
export const Loading = () => (
    <Box
        animation={animation}
        border="5px solid grey"
        borderRadius={'50%'}
        borderTop={'5px solid'}
        height="40px"
        width="40px"
    />
);
