import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import checkLocationPathName from '../checkLocationPathName';

export function BackToHome() {
  const isCartPage = checkLocationPathName();
  const nav = useNavigate();
  const location = window.location.pathname
    .split(`/`)
    [window.location.pathname.split(`/`).length - 1].toLocaleUpperCase();

  return (
    <div
      className={
        isCartPage
          ? 'text-black text-decoration-none d-flex my-2 gap-2 d-md-none align-items-end justify-content-center'
          : 'd-none'
      }
    >
      <span type="button" onClick={() => nav(-1)}>
        <ArrowBack />
      </span>
      <span>
        <b>{location}</b>
      </span>
    </div>
  );
}
