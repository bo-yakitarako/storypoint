import { atom, selector } from 'recoil';

export const userIdState = atom({
  key: 'userIdState',
  default: Number(localStorage.userId || 0),
});

export const nameDialogOpenState = atom({
  key: 'nameDialogOpenState',
  default: false,
});

export const nameState = atom<string | null>({
  key: 'nameState',
  default: localStorage.name ?? null,
});

export const jiraLinkDialogOpenState = atom({
  key: 'jiraLinkDialogOpenState',
  default: false,
});

export const jiraLinkState = atom<string | null>({
  key: 'jiraLinkState',
  default: null,
});

export type PlanningUser = {
  userId: number;
  name: string;
  storyPoint: string | null;
};

export const planningUsersState = atom({
  key: 'planningUsersState',
  default: [] as PlanningUser[],
});

export const includeInPlanningUsersSelector = selector({
  key: 'includeInPlanningUsersSelector',
  get: ({ get }) => {
    const userId = get(userIdState);
    const users = get(planningUsersState);
    return users.some((user) => user.userId === userId);
  },
});

export const userCountState = atom({
  key: 'userCountState',
  default: 0,
});

export const finishDialogOpenState = atom({
  key: 'finishDialogOpenState',
  default: false,
});
