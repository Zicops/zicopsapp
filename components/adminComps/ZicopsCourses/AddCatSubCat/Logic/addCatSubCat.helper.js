export function getCatSubCatData(data = {}) {
  return {
    id: data?.id || '',
    Name: data?.Name || '',
    Description: data?.Description || '',

    File: data?.File || null,
    ImageUrl: data?.ImageUrl || null,
    Code: data?.Code || '',

    LspId: data?.LspId || null,
    CatId: data?.CatId || null,
    CatName: data?.CatName || null,

    IsActive: data?.IsActive || true,
    CreatedAt: data?.CreatedAt || '',
    UpdatedAt: data?.UpdatedAt || '',
    CreatedBy: data?.CreatedBy || '',
    UpdatedBy: data?.UpdatedBy || '',

    isSubCat: data?.isSubCat || false
  };
}
