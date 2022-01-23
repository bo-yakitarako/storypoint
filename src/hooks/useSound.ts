import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { canSoundState, planningUsersState } from '../modules/store';

export const useSound = () => {
  const [canSound, setCanSound] = useRecoilState(canSoundState);
  const users = useRecoilValue(planningUsersState);
  useEffect(() => {
    if (
      canSound &&
      users.length > 0 &&
      users.every(({ storyPoint }) => storyPoint !== '-')
    ) {
      console.log('ちんこぶり');
      setCanSound(false);
    }
  }, [users, canSound]);
};
