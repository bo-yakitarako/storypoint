import { atom } from 'recoil';

export const nameDialogOpenState = atom({
  key: 'nameDialogOpenState',
  default: false,
});

export const nameState = atom<string | null>({
  key: 'nameState',
  default: localStorage.name ?? null,
});

// export const nameDisplaySelector = selector({
//   key: 'nameDisplaySelector',
//   get: ({ get }) => {
//     const name = get(nameState);
//     return name !== null ? `${name}くん` : '';
//   },
// });

export const jiraLinkState = atom<string | null>({
  key: 'jiraLinkState',
  default: 'https://autoscale.atlassian.net/browse/SW-552',
});
