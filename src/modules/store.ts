import { atom } from 'recoil';

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

type PlanningUser = {
  userId: number;
  name: string;
  storyPoint: string | null;
};

export const planningUsersState = atom({
  key: 'planningUsersState',
  default: [] as PlanningUser[],
});
