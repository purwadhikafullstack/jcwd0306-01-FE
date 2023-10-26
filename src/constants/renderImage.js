export const renderImage = (e, targetId, setImgSrc) => {
  const target = document.getElementById(targetId);
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result);
      target.src = reader.result;
      setImgSrc(reader.result);
    };
  })
    .then((resolve) => resolve)
    .catch((err) => console.log(err));
};
