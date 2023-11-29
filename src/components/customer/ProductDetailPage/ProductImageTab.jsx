import { TabContext, TabPanel } from '@mui/lab';
import { Stack, Tab, Tabs } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { useSelector } from 'react-redux';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

function ProductImageTab() {
  const product = useSelector((states) => states.product);
  const [currImageId, setCurrImageId] = useState(null);
  const [stackTop, setStackTop] = useState(null);

  const stackRef = useCallback((node) => {
    if (node !== null) {
      const getTop = () => {
        // this function is used to measure the distance from top of stack element to the body
        let tempNode = node;
        let yPosition = 0;
        while (tempNode) {
          yPosition += tempNode.offsetTop;
          tempNode = tempNode.offsetParent;
        }
        return yPosition;
      };
      setStackTop(getTop());
    }
  }, []);

  useEffect(() => {
    setCurrImageId(String(product.imageIds[0]));
  }, [product]);

  if (!currImageId) return null;

  return (
    <TabContext value={currImageId}>
      <Stack
        ref={stackRef}
        spacing={1}
        sx={{ position: 'sticky', top: `${stackTop}px` }}
      >
        {product.imageIds.map((imageId) => (
          <TabPanel
            key={imageId}
            value={String(imageId)}
            sx={{
              p: 0,
              width: '100%',
              aspectRatio: '1 / 1',
              m: '0 !important',
              '& > *': { borderRadius: 1 },
            }}
          >
            <InnerImageZoom
              src={`${
                import.meta.env.VITE_API_BASE_URL
              }/products/images/${imageId}`}
              width="100%"
              height="100%"
              fullscreenOnMobile
              imgAttributes={{ alt: `Product ${product.id} - ${imageId}` }}
            />
          </TabPanel>
        ))}
        <Tabs
          allowScrollButtonsMobile
          value={product.imageIds.includes(+currImageId) ? currImageId : false}
          aria-label="Product Image Tabs"
          variant="scrollable"
          onChange={(e, val) => setCurrImageId(val)}
          TabIndicatorProps={{ hidden: true }}
          TabScrollButtonProps={{
            sx: {
              position: 'absolute',
              zIndex: 1,
              bgcolor: 'background.paper',
              boxShadow: 4,
              width: 'fit-content',
              height: 'fit-content',
              alignSelf: 'center',
              '&:nth-of-type(1)': {
                left: 0,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              },
              '&:nth-of-type(4)': {
                right: 0,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              },
            },
          }}
          sx={{
            position: 'relative',
            width: '100%',
            height: '4rem',
            '& div.MuiTabs-flexContainer': {
              gap: '0.4rem',
              height: '100%',
              '& .Mui-selected': { border: 'solid 0.1rem' },
            },
          }}
        >
          {product.imageIds.map((imageId) => (
            <Tab
              onMouseEnter={(e) => e.target.click()}
              key={imageId}
              value={String(imageId)}
              sx={{
                backgroundImage: `url(${
                  import.meta.env.VITE_API_BASE_URL
                }/products/images/${imageId})`,
                backgroundSize: '100% 100%',
                borderRadius: 1,
                width: '4rem',
                minWidth: '4rem',
              }}
            />
          ))}
        </Tabs>
      </Stack>
    </TabContext>
  );
}

export default ProductImageTab;
