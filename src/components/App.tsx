import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { NameDialog } from './NameDialog';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <NameDialog />
    </ChakraProvider>
  );
};

export { App };
