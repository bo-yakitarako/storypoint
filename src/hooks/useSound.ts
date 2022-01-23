import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  canSoundState,
  enableSoundState,
  planningUsersState,
} from '../modules/store';

const audioContext = new AudioContext();

export const useSound = () => {
  const [canSound, setCanSound] = useRecoilState(canSoundState);
  const users = useRecoilValue(planningUsersState);
  const enableSound = useRecoilValue(enableSoundState);
  useEffect(() => {
    if (
      enableSound &&
      canSound &&
      users.length > 0 &&
      users.every(({ storyPoint }) => storyPoint !== '-')
    ) {
      playSound('/sounds/neruneru.mp3');
      setCanSound(false);
    }
  }, [users, enableSound, canSound]);
};

const setupSound = async (resourcePath: string) => {
  const audioRes = await fetch(resourcePath);
  const audioArrayBuffer = await audioRes.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(audioArrayBuffer);
  return audioBuffer;
};

const playSound = async (resourcePath: string) => {
  const audioBuffer = await setupSound(resourcePath);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};
