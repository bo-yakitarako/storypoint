import { useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useSetRecoilState } from 'recoil';
import {
  jiraLinkState,
  planningUsersState,
  PlanningUser,
  userCountState,
} from '../modules/store';

const db = getDatabase();
const taskRef = ref(db, 'taskUrl');
const userRef = ref(db, 'users');
const userCountRef = ref(db, 'userCount');

export const useListening = () => {
  const setTaskUrlState = useSetRecoilState(jiraLinkState);
  const setUsersState = useSetRecoilState(planningUsersState);
  const setUserCount = useSetRecoilState(userCountState);
  useEffect(() => {
    onValue(taskRef, (spapshot) => {
      setTaskUrlState(spapshot.val());
    });
    onValue(userRef, (snapshot) => {
      const dbUsers: PlanningUser[] | null = snapshot.val();
      const users = dbUsers?.filter((user) => user !== null) ?? [];
      setUsersState(users);
    });
    onValue(userCountRef, (snapshot) => {
      setUserCount(snapshot.val());
    });
  }, []);
};
