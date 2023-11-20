import { useLocation } from 'react-router-dom';

function useIsPathName(...pathName) {
  const currPathName = useLocation().pathname.split('/')[1];
  return pathName.includes(currPathName);
}

export default useIsPathName;
