import React from 'react';
import { Box, ChakraProvider, Flex, Image } from '@chakra-ui/react';
import { NameDialog } from './dialog/NameDialog';
import { TaskScreen } from './main/TaskScreen';
import { NameBalloon } from './NameBalloon';
import { TaskDialog } from './dialog/TaskDialog';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <NameDialog />
      <TaskDialog />
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="100vh"
      >
        <Box>
          <TaskScreen />
        </Box>
      </Flex>
      <NameBalloon />
      <Image
        alt="かわいいかわいいGopherくんかわいいねえかわいいよ"
        src="/images/gopher.png"
        position="fixed"
        bottom="0"
        right="-200px"
        width="600px"
        zIndex="-1"
      />
    </ChakraProvider>
  );
};

export { App };
