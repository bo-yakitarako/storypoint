import React from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Box } from '@chakra-ui/react';
import { includeInPlanningUsersSelector } from '../../modules/store';
import { useRegistry } from '../../hooks/useRegistry';
import { TaskScreen } from './TaskScreen';
import { StoryPointSetting } from './StoryPointSetting';
import { InfoTable } from './InfoTable';
import { Options } from './Options';

const Main: React.FC = () => {
  const includingInUsers = useRecoilValue(includeInPlanningUsersSelector);
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
      <Options />
      <Box>
        <TaskScreen />
        <StoryPointSetting />
      </Box>
      <InfoTable />
    </>
  );
};

export { Main };
