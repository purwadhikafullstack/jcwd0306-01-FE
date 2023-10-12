import ReduxLoadingBar from 'react-redux-loading-bar';

function LoadingBar() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <ReduxLoadingBar style={{ backgroundColor: 'green' }} />
    </div>
  );
}

export default LoadingBar;
