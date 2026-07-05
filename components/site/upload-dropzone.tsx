"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMb?: number;
  disabled?: boolean;
}

export function UploadDropzone({
  onFileSelect,
  accept = "image/png,image/jpeg,image/gif",
  maxSizeMb = 10,
  disabled = false,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file || disabled) return;
    if (file.size > maxSizeMb * 1024 * 1024) return;
    onFileSelect(file);
  };

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-dashed border-surface-border px-6 py-10 text-center transition-colors",
        isDragOver && !disabled && "border-brand bg-accent-dim",
        disabled && "pointer-events-none opacity-50",
      )}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragOver(false);
        handleFile(event.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        disabled={disabled}
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <Upload
        className="mx-auto mb-3 h-8 w-8 text-copy-muted"
        strokeWidth={1.5}
      />

      <p className="text-sm">
        <button
          type="button"
          onClick={openFilePicker}
          disabled={disabled}
          className="font-medium text-brand hover:underline disabled:cursor-not-allowed"
        >
          Upload a file
        </button>
        <span className="text-copy-secondary"> or drag and drop</span>
      </p>

      <p className="mt-2 text-xs text-copy-muted">
        PNG, JPG, GIF up to {maxSizeMb}MB
      </p>
    </div>
  );
}