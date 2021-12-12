import React from 'react';
import { Box, ChakraProvider, Flex, Image, Button } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import '../modules/firebase';
import { NameDialog } from './dialog/NameDialog';
import { TaskScreen } from './main/TaskScreen';
import { NameBalloon } from './NameBalloon';
import { TaskDialog } from './dialog/TaskDialog';
import { StoryPointSetting } from './main/StoryPointSetting';
import { InfoTable } from './main/InfoTable';
import { useListening } from '../hooks/useListening';
import { includeInPlanningUsersSelector } from '../modules/store';
import { useUser } from '../hooks/useUser';

const App: React.FC = () => {
  useListening();
  const includingInUsers = useRecoilValue(includeInPlanningUsersSelector);
  const { register } = useUser();
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
        {includingInUsers ? (
          <>
            <Box>
              <TaskScreen />
              <StoryPointSetting />
            </Box>
            <InfoTable />
          </>
        ) : (
          <Button colorScheme="green" onClick={register}>
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
