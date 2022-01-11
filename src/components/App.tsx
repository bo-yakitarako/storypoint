import React from 'react';
import { ChakraProvider, Flex, Image, Spinner } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import '../modules/firebase';
import { NameDialog } from './dialog/NameDialog';
import { NameBalloon } from './NameBalloon';
import { TaskDialog } from './dialog/TaskDialog';
import { useListening } from '../hooks/useListening';
import { fetchingState } from '../modules/store';
import { FinishAlert } from './dialog/FinishAlert';
import { RemoveAlert } from './dialog/RemoveAlert';
import { Main } from './main/Main';

const App: React.FC = () => {
  useListening();
  const isFetched = useRecoilValue(fetchingState);
  return (
    <ChakraProvider>
      <NameDialog />
      <TaskDialog />
      <FinishAlert />
      <RemoveAlert />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="100vh"
      >
        {isFetched ? (
          <Main />
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
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
