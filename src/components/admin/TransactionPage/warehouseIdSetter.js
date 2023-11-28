export function warehouseIdSetter(setWarehouseIds, warehouseId = []) {
  const temp = [];
  warehouseId.forEach((val) => temp.push(val.warehouseId));
  return setWarehouseIds(temp);
}
