import { useCallback } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  nameState,
  planningUsersState,
  userCountState,
  userIdState,
} from '../modules/store';

const db = getDatabase();

export const useUser = () => {
  const name = useRecoilValue(nameState);
  const userCount = useRecoilValue(userCountState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const users = useRecoilValue(planningUsersState);

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

  const resetStoryPoint = useCallback(() => {
    set(
      ref(db, 'users'),
      users.map((user) => ({ ...user, storyPoint: null })),
    );
  }, [users]);

  const setStoryPoint = useCallback((storyPoint: string) => {
    set(ref(db, `users/${userId}/storyPoint`), storyPoint);
  }, []);

  const rename = useCallback((name) => {
    set(ref(db, `users/${userId}/name`), name);
  }, []);

  return { register, resetStoryPoint, setStoryPoint, rename };
};
