import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function useSwal() {
  const theme = useTheme();
  return useMemo(
    () =>
      MySwal.mixin({
        didOpen: () => {
          MySwal.getContainer().style.zIndex = theme.zIndex.modal + 1;
        },
        confirmButtonColor: theme.palette.primary.main,
        denyButtonColor: theme.palette.error.main,
        allowOutsideClick: () => !MySwal.isLoading(),
      }),
    [theme]
  );
}

export default useSwal;
