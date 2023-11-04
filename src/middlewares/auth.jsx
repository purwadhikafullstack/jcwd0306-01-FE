import { Navigate } from 'react-router-dom';

export function AuthorizeUser({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
