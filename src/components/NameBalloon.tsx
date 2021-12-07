import React from 'react';
import { Box } from '@chakra-ui/react';

const NameBalloon: React.FC = () => {
  const name = localStorage.name ? `${localStorage.name}くん` : '';
  return (
    <Box
      position="fixed"
      bgColor="blue.500"
      color="white"
      padding="16px"
      bottom="32px"
      right="420px"
      borderRadius="8px"
      zIndex={-1}
      _after={{
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        left: '100%',
        top: '50%',
        marginTop: '-14px',
        border: 'solid transparent',
        borderWidth: '15px',
        borderLeftColor: 'blue.500',
      }}
    >
      {name}やっほー
    </Box>
  );
};

export { NameBalloon };
