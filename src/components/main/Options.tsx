import { Box, Button, Checkbox } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  enableSoundState,
  finishDialogOpenState,
  removeAlertOpenState,
} from '../../modules/store';

const Options: React.FC = () => {
  const setFinishDialogOpen = useSetRecoilState(finishDialogOpenState);
  const setRemoveAlertOpen = useSetRecoilState(removeAlertOpenState);
  const [enableSound, setEnableSound] = useRecoilState(enableSoundState);
  return (
    <Box position="fixed" right="16px" top="16px">
      <Box display="flex" justifyContent="right">
        <Button marginRight={4} onClick={() => setRemoveAlertOpen(true)}>
          抜ける
        </Button>
        <Button colorScheme="red" onClick={() => setFinishDialogOpen(true)}>
          解散
        </Button>
      </Box>
      <Box marginTop={4}>
        <Checkbox
          isChecked={enableSound}
          colorScheme="green"
          onChange={(event) => {
            setEnableSound(event.target.checked);
            localStorage.enableSound = event.target.checked.toString();
          }}
        >
          みんな揃ったら音鳴ってほしい！
        </Checkbox>
      </Box>
    </Box>
  );
};

export { Options };
