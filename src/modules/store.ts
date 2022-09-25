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
  performer: boolean;
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

export const fetchingState = atom({
  key: 'fetchingState',
  default: false,
});

export const removeAlertOpenState = atom({
  key: 'removeAlertOpenState',
  default: false,
});

// useEffectで無駄に鳴らさないように、サウンドを鳴らすことができるフラグを立てる
// そのフラグとなるbooleanのstate
// ちなみにフラグが立つのは誰かがstorypointを投げたタイミングにしてる
export const canSoundState = atom({
  key: 'canSoundState',
  default: false,
});

// 音を鳴らすかどうかの設定用、ユーザーが決めるやつね
export const enableSoundState = atom({
  key: 'soundSettingState',
  default: JSON.parse(localStorage.enableSound ?? 'false') as boolean,
});

export const soundVolumeState = atom({
  key: 'soundVolumeState',
  default: JSON.parse(localStorage.soundVolume ?? '50') as number,
});
