import React from 'react';
import { Box, ChakraProvider, Flex, Image, Button } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import '../modules/firebase';
import { NameDialog } from './dialog/NameDialog';
import { TaskScreen } from './main/TaskScreen';
import { NameBalloon } from './NameBalloon';
import { TaskDialog } from './dialog/TaskDialog';
import { StoryPointSetting } from './main/StoryPointSetting';
import { InfoTable } from './main/InfoTable';
import { useListening } from '../hooks/useListening';
import {
  finishDialogOpenState,
  includeInPlanningUsersSelector,
} from '../modules/store';
import { useRegistry } from '../hooks/useRegistry';
import { FinishAlert } from './dialog/FinishAlert';

const App: React.FC = () => {
  useListening();
  const includingInUsers = useRecoilValue(includeInPlanningUsersSelector);
  const setFinishDialogOpen = useSetRecoilState(finishDialogOpenState);
  const { register } = useRegistry();
  return (
    <ChakraProvider>
      <NameDialog />
      <TaskDialog />
      <FinishAlert />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="100vh"
      >
        {includingInUsers ? (
          <>
            <Button
              position="fixed"
              right="16px"
              top="16px"
              colorScheme="red"
              onClick={() => setFinishDialogOpen(true)}
            >
              解散
            </Button>
            <Box>
              <TaskScreen />
              <StoryPointSetting />
            </Box>
            <InfoTable />
          </>
        ) : (
          <Button colorScheme="green" onClick={() => register()}>
            さんか
          </Button>
        )}
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
