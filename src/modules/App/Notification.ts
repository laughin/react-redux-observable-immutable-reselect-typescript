import { notification } from 'antd';

const openNotificationWithIcon = (type: string, message: number, description: string, time: number) => {
  notification[type]({
    message: message ? String(message) : '',
    description: description ? String(description) : '',
    duration: time || 3
  });
};

export default openNotificationWithIcon;
