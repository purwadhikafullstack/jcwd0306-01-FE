import { EmailOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import api from '../../../../constants/api';

function MessageButton() {
  const warehouseIds = useSelector((state) => state.warehouseUser);
  const fetchUnreadMsg = async () => {
    const { data } = await api.get(`/chat/inbox`, { params: { warehouseId } });
  };
  return (
    <IconButton color="text">
      <EmailOutlined />
    </IconButton>
  );
}

export default MessageButton;
