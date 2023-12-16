export default function getPartDescription(partDetails) {
  const partNumber = partDetails?.partNumber;
  const partGroup = partDetails?.itemGroup;
  const partName = partDetails?.partName;
  const partCategory = partDetails?.category;
  const partClass = partDetails?.brandClass;
  const partModel = partDetails?.brandModel;
  const partInStock =
    Number(partDetails?.stock) >= 0 && partDetails?.stock > 0
      ? 'Available in Stock'
      : 'Out of Stock';

  const productDescription =
    (partDetails?.docID &&
      `Mercedes Spare Part Number: ${partNumber} - ${partName}, ${partCategory} ` +
        `applicable for Mercedes "${partClass}" ` +
        `and Mercedes Model "${partModel}", of Type ${partGroup} currently ${partInStock}`) ||
    '';

  return productDescription;
}
