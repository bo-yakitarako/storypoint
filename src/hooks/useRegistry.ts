import { useCallback } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nameState, userCountState, userIdState } from '../modules/store';

const db = getDatabase();

export const useRegistry = () => {
  const userName = useRecoilValue(nameState);
  const userCount = useRecoilValue(userCountState);
  const setUserId = useSetRecoilState(userIdState);

  const register = useCallback(
    (name: string | null = userName) => {
      if (userCount < 1 || name === null) {
        return;
      }
      const userId = userCount + 1;
      set(ref(db, `users/${userId}`), {
        userId,
        name,
        storyPoint: '-',
      });
      set(ref(db, 'userCount'), userId);
      setUserId(userId);
      localStorage.userId = `${userId}`;
    },
    [userCount, userName],
  );

  return { register };
};
