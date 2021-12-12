import { useCallback } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nameState, userCountState, userIdState } from '../modules/store';

const db = getDatabase();

export const useRegistry = () => {
  const name = useRecoilValue(nameState);
  const userCount = useRecoilValue(userCountState);
  const setUserId = useSetRecoilState(userIdState);

  const register = useCallback(() => {
    if (userCount < 1 || name === null) {
      return;
    }
    const userId = userCount + 1;
    set(ref(db, `users/${userId}`), {
      userId,
      name,
      storyPoint: null,
    });
    set(ref(db, 'userCount'), userId);
    setUserId(userId);
    localStorage.userId = `${userId}`;
  }, [userCount, name]);

  return { register };
};
