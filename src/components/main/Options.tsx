import {
  Box,
  Flex,
  Button,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { playSound } from '../../hooks/useSound';
import {
  enableSoundState,
  finishDialogOpenState,
  removeAlertOpenState,
  soundVolumeState,
} from '../../modules/store';

const Options: React.FC = () => {
  const setFinishDialogOpen = useSetRecoilState(finishDialogOpenState);
  const setRemoveAlertOpen = useSetRecoilState(removeAlertOpenState);
  const [enableSound, setEnableSound] = useRecoilState(enableSoundState);
  const [soundVolume, setSoundVolume] = useRecoilState(soundVolumeState);
  return (
    <Box position="fixed" right="16px" top="16px">
      <Flex justifyContent="right">
        <Button marginRight={4} onClick={() => setRemoveAlertOpen(true)}>
          抜ける
        </Button>
        <Button colorScheme="red" onClick={() => setFinishDialogOpen(true)}>
          解散
        </Button>
      </Flex>
      <Flex marginTop={4} justifyContent="right">
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
      </Flex>
      {enableSound && (
        <Flex marginTop={4} justifyContent="right" alignItems="center">
          <Text fontSize="16px">音量</Text>
          <Box width="160px" marginX={2}>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={soundVolume}
              min={0}
              max={100}
              onChange={(value) => {
                setSoundVolume(value);
                localStorage.soundVolume = value.toString();
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => playSound('/sounds/neruneru.mp3', soundVolume)}
          >
            試聴
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export { Options };
