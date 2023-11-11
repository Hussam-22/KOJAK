export default function getPartDescription(partDetails) {
  const partNumber = partDetails?.partNumber;
  const partGroup = partDetails?.itemGroup;
  const partName = partDetails?.description;
  const partCategory = partDetails?.category;
  const partClass = partDetails?.brandClass;
  const partModel = partDetails?.brandModel;
  const partInStock =
    partDetails?.stock >= 0 && partDetails?.stock > 0 ? 'Available in Stock' : 'Out of Stock';

  const productDescription =
    (partDetails?.id &&
      `Mercedes Spare Part Number: ${partNumber} - ${partName}, ${partCategory} ` +
        `applicable for Mercedes Class ${partClass[0]} ` +
        `and Mercedes Model ${partModel[0]}, of Type ${partGroup} currently ${partInStock}`) ||
    '';

  return productDescription;
}
