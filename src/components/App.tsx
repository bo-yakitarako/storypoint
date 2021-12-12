import React from 'react';
import { Box, ChakraProvider, Flex, Image } from '@chakra-ui/react';
import '../modules/firebase';
import { NameDialog } from './dialog/NameDialog';
import { TaskScreen } from './main/TaskScreen';
import { NameBalloon } from './NameBalloon';
import { TaskDialog } from './dialog/TaskDialog';
import { StoryPointSetting } from './main/StoryPointSetting';
import { InfoTable } from './main/InfoTable';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <NameDialog />
      <TaskDialog />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="100vh"
      >
        <Box>
          <TaskScreen />
          <StoryPointSetting />
        </Box>
        <InfoTable />
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
