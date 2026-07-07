export type BlobAccess = "public" | "private";

export interface BlobStorageConfig {
  enabled: boolean;
  token?: string;
  storeId?: string;
  access: BlobAccess;
}

function resolveBlobAccess(): BlobAccess {
  const configured = process.env.BLOB_ACCESS?.trim().toLowerCase();

  if (configured === "public" || configured === "private") {
    return configured;
  }

  return "public";
}

export function getBlobStorageConfig(): BlobStorageConfig {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  const storeId = process.env.BLOB_STORE_ID?.trim();

  return {
    enabled: Boolean(token),
    token,
    storeId,
    access: resolveBlobAccess(),
  };
}

export function requireBlobStorageConfig(): BlobStorageConfig & {
  token: string;
} {
  const config = getBlobStorageConfig();

  if (!config.token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is required. Add it to your environment variables.",
    );
  }

  return { ...config, token: config.token };
}