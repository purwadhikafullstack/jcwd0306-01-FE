export default function checkLocationPathName() {
  const pages = [`/cart`, `/cart/shipment`];
  return Boolean(pages.find((page) => page === window.location.pathname));
}
