import styles from '../toasterNotification.module.scss';

const { success, danger, info, warning } = styles;

export const BUTTON_PROPS = [
  {
    id: 1,
    type: 'success',
    className: success,
    label: 'Success'
  },
  {
    id: 2,
    type: 'danger',
    className: danger,
    label: 'Danger'
  },
  {
    id: 3,
    type: 'info',
    className: info,
    label: 'Info'
  },
  {
    id: 4,
    type: 'warning',
    className: warning,
    label: 'Warning'
  }
];
