import api from '../../constants/api';
import { constant } from '../../constants/constant';

export const updateIsRead = async (
  setMessages,
  dispatch,
  messages = [],
  userId = 0
) => {
  try {
    const temp = [];
    if (window.location.pathname.split('/')[1] === 'admin') {
      messages.forEach((msg) => {
        if (!msg.receiverId && !msg.isRead) {
          msg.isRead = true;
          temp.push(msg);
        }
      });
    } else {
      messages.forEach((msg) => {
        if (msg.receiverId === userId && !msg.isRead) {
          msg.isRead = true;
          temp.push(msg);
        }
      });
    }
    if (!temp.length) return;
    await api.patch(`/chat/multi_records`, { data: temp });
    setMessages([...messages]);
  } catch (error) {
    dispatch(constant.setError(error));
  }
};
