import { atom } from 'recoil';

export const currentPage = atom({
  key: 'currentPage',
  default: 0,
});

export const currentView = atom({
    key: 'currentView',
    default: 'grid',
});