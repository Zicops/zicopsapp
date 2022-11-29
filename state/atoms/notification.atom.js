import { atom } from 'recoil';

export const NotificationAtom = atom({
  key: 'Notification',
  default: []
});

export function Notification(data = {}) {
  return {
    title: data.title || '',
    body: data.body || '',
    link: data.link || '',
    image: '',
    isRead: false
  };
}
