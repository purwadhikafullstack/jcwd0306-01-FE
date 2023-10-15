const checkBoxHandler = (checkBoxesName = '', checkAllBoxId = '') => {
  const checkBoxes = document.getElementsByName(checkBoxesName);
  const checkAll = document.getElementById(checkAllBoxId);
  const temp = new Set();
  for (let i = 0; i < checkBoxes.length; i += 1) {
    temp.add(checkBoxes[i].checked);
    if (temp.size > 1 || temp.has(false)) {
      checkAll.checked = false;
      return;
    }
    if (temp.size === 1) {
      checkAll.checked = true;
    }
  }
};

export default checkBoxHandler;
