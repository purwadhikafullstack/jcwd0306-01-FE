import { ArrowBack } from '@mui/icons-material';

export function BackToHome() {
  return (
    <a
      className={
        window.location.pathname !== '/'
          ? 'text-black text-decoration-none align-middle d-md-block d-lg-none'
          : 'd-none'
      }
      href="/"
    >
      <ArrowBack />
      {window.location.pathname.split(`/`)[1].toLocaleUpperCase()}
    </a>
  );
}
