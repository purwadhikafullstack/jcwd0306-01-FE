import MuiCarousel from 'react-material-ui-carousel';
import { useSelector } from 'react-redux';

function Carousel() {
  const carousels = useSelector((states) => states.carousels);

  return (
    <MuiCarousel
      strictIndexing={false}
      height="50vw"
      animation="slide"
      duration={1000}
      navButtonsWrapperProps={{ className: 'carousel_nav-buttons-wrapper' }}
      navButtonsProps={{ className: 'carousel_nav-buttons' }}
      indicatorContainerProps={{ className: 'carousel_indicator-container' }}
      activeIndicatorIconButtonProps={{
        className: 'carousel_active-indicator-icon-button',
      }}
      sx={{
        maxWidth: 'lg',
        mx: 'auto',
        my: 4,
        borderRadius: 2,
        '& *': { maxHeight: '20rem' },
        '&:hover button.carousel_nav-buttons': { opacity: 1 },
        '& div.carousel_nav-buttons-wrapper:hover button': {
          bgcolor: 'white',
        },
        '& div.carousel_nav-buttons-wrapper button.carousel_nav-buttons': {
          color: 'GrayText',
          bgcolor: 'white',
          '&:hover': { bgcolor: 'white' },
        },
        '& div.carousel_indicator-container': {
          position: 'absolute',
          bottom: 0,
          m: 0,
          px: 2,
          py: 1,
          zIndex: 10,
          display: 'flex',
          '& *': { fontSize: '0.8rem' },
        },
        '& button.carousel_active-indicator-icon-button': {
          color: 'primary.main',
        },
      }}
    >
      {carousels.map((carousel) => (
        <img
          key={carousel.id}
          src={`${import.meta.env.VITE_API_BASE_URL}/carousels/images/${
            carousel.id
          }`}
          alt={`carousel-${carousel.id}`}
          style={{ width: '100%', height: '100%' }}
        />
      ))}
    </MuiCarousel>
  );
}

export default Carousel;
