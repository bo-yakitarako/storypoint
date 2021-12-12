import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Box } from '@chakra-ui/react';
import {
  includeInPlanningUsersSelector,
  finishDialogOpenState,
} from '../../modules/store';
import { useRegistry } from '../../hooks/useRegistry';
import { TaskScreen } from './TaskScreen';
import { StoryPointSetting } from './StoryPointSetting';
import { InfoTable } from './InfoTable';

const Main: React.FC = () => {
  const includingInUsers = useRecoilValue(includeInPlanningUsersSelector);
  const setFinishDialogOpen = useSetRecoilState(finishDialogOpenState);
  const { register } = useRegistry();
  if (!includingInUsers) {
    return (
      <Button colorScheme="green" onClick={() => register()}>
        さんか
      </Button>
    );
  }
  return (
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
  );
};

export { Main };
