import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LogoutUser from '../../components/LogoutUser';

function HomePage() {
  const nav = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    console.log('authUser', authUser);
  }, [authUser]);
  return (
    <div className="vh-100 vw-100 d-flex align-items-center justify-content-center flex-column">
      <Button
        onClick={() => {
          nav(`/cart/shipment`, {
            state: {
              productId: 1,
              quantity: 2,
              Product: {
                name: `GoPro`,
                price: 7299000,
                discount: 0,
                weight: 300,
              },
            },
          });
        }}
      >
        Dummy Direct Buy
      </Button>
      <LogoutUser />
    </div>
  );
}

export default HomePage;
