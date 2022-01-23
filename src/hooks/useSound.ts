import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  canSoundState,
  enableSoundState,
  planningUsersState,
  soundVolumeState,
} from '../modules/store';

const audioContext = new AudioContext();

export const useSound = () => {
  const [canSound, setCanSound] = useRecoilState(canSoundState);
  const users = useRecoilValue(planningUsersState);
  const enableSound = useRecoilValue(enableSoundState);
  const soundVolume = useRecoilValue(soundVolumeState);
  useEffect(() => {
    if (
      users.length > 0 &&
      users.every(({ storyPoint }) => storyPoint !== '-')
    ) {
      setCanSound(false);
      if (enableSound && canSound) {
        playSound('/sounds/neruneru.mp3', soundVolume);
      }
    }
  }, [users, enableSound, canSound, soundVolume]);
};

const setupSound = async (resourcePath: string) => {
  const audioRes = await fetch(resourcePath);
  const audioArrayBuffer = await audioRes.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(audioArrayBuffer);
  return audioBuffer;
};

export const playSound = async (resourcePath: string, volume: number) => {
  const audioBuffer = await setupSound(resourcePath);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume / 100;
  gainNode.connect(audioContext.destination);
  source.connect(gainNode).connect(audioContext.destination);
  source.start();
};
