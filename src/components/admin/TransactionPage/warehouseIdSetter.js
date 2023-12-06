export function warehouseIdSetter(setWarehouseIds, warehouseId = []) {
  const temp = [];
  warehouseId.forEach((val) => {
    if (val?.id) temp.push(val.id);
    else temp.push(val.warehouseId);
  });
  return setWarehouseIds(temp);
}
