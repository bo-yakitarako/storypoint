import { useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useSetRecoilState } from 'recoil';
import {
  jiraLinkState,
  planningUsersState,
  PlanningUser,
  userCountState,
  fetchingState,
  canSoundState,
} from '../modules/store';

const db = getDatabase();
const taskRef = ref(db, 'taskUrl');
const userRef = ref(db, 'users');
const userCountRef = ref(db, 'userCount');

export const useListening = () => {
  const setTaskUrlState = useSetRecoilState(jiraLinkState);
  const setUsersState = useSetRecoilState(planningUsersState);
  const setUserCount = useSetRecoilState(userCountState);
  const setFetchingState = useSetRecoilState(fetchingState);
  const setCanSound = useSetRecoilState(canSoundState);
  useEffect(() => {
    onValue(
      userRef,
      () => {
        setFetchingState(true);
      },
      {
        onlyOnce: true,
      },
    );
    onValue(taskRef, (spapshot) => {
      setTaskUrlState(spapshot.val());
    });
    onValue(userRef, (snapshot) => {
      const dbUsers: PlanningUser[] = Object.values(snapshot.val() ?? {});
      const users = dbUsers.filter((user) => user !== null);
      setUsersState(users);
      const validUserCount = users.filter(
        (user) => user.storyPoint !== '-',
      ).length;
      if (validUserCount > 0 && validUserCount < users.length) {
        setCanSound(true);
      }
    });
    onValue(userCountRef, (snapshot) => {
      setUserCount(snapshot.val());
    });
  }, []);
};
