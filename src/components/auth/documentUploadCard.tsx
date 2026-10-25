import { useState, useRef, ChangeEvent, DragEvent } from "react";
import {
  UploadCloud,
  FileCheck,
  FileText,
  X,
  AlertCircle,
  RefreshCw,
  Eye,
} from "lucide-react";

export interface UploadedFileState {
  file: File;
  previewUrl: string | null;
  name: string;
  sizeBytes: number;
}

interface DocumentUploadCardProps {
  id: string;
  label: string;
  helperText?: string;
  required?: boolean;
  accept?: string;
  maxSizeBytes?: number; // default 5MB
  value: UploadedFileState | null;
  onChange: (fileState: UploadedFileState | null) => void;
  error?: string;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";

export function DocumentUploadCard({
  id,
  label,
  helperText,
  required = false,
  accept = DEFAULT_ACCEPT,
  maxSizeBytes = DEFAULT_MAX_SIZE,
  value,
  onChange,
  error: externalError,
}: DocumentUploadCardProps) {
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayError = externalError || internalError;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const validateAndProcessFile = (file: File) => {
    setInternalError(null);

    // Validate size
    if (file.size > maxSizeBytes) {
      setInternalError(
        `File is too large (${formatFileSize(file.size)}). Maximum allowed size is ${formatFileSize(
          maxSizeBytes
        )}.`
      );
      return;
    }

    // Validate type against accept
    const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    const isTypeValid = acceptedTypes.some(
      (type) =>
        type === fileType ||
        (type.startsWith(".") && fileExtension === type) ||
        (type.endsWith("/*") && fileType.startsWith(type.replace("/*", "")))
    );

    if (!isTypeValid) {
      setInternalError(
        "Invalid file format. Please upload JPEG, PNG, WebP images or PDF documents."
      );
      return;
    }

    // Generate preview for image formats
    let previewUrl: string | null = null;
    if (file.type.startsWith("image/")) {
      previewUrl = URL.createObjectURL(file);
    }

    onChange({
      file,
      previewUrl,
      name: file.name,
      sizeBytes: file.size,
    });
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
    // reset input so the same file name can be re-selected if replaced
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleRemove = () => {
    if (value?.previewUrl) {
      URL.revokeObjectURL(value.previewUrl);
    }
    onChange(null);
    setInternalError(null);
  };

  const handleTriggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={id} className="font-medium text-primary flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-accent">*</span>}
        </label>
        {helperText && (
          <span className="text-[11px] text-secondary font-mono">{helperText}</span>
        )}
      </div>

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="sr-only"
        aria-invalid={!!displayError}
        aria-describedby={displayError ? `${id}-error` : undefined}
      />

      {value ? (
        /* Uploaded State Card */
        <div className="p-3 bg-surface border border-accent/40 rounded-sm shadow-subtle flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Thumbnail Preview or Document Icon */}
            {value.previewUrl ? (
              <div className="w-12 h-12 rounded-xs border border-border overflow-hidden shrink-0 bg-[#F8F8F5] relative group">
                <img
                  src={value.previewUrl}
                  alt={`${label} preview`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xs border border-border bg-[#F8F8F5] flex items-center justify-center shrink-0 text-accent">
                <FileText className="w-6 h-6" />
              </div>
            )}

            <div className="overflow-hidden space-y-0.5">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-primary truncate block max-w-[180px] sm:max-w-xs">
                  {value.name}
                </span>
              </div>
              <p className="text-[10px] font-mono text-secondary">
                {formatFileSize(value.sizeBytes)} &bull; Ready for verification
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            {value.previewUrl && (
              <button
                type="button"
                onClick={() => window.open(value.previewUrl!, "_blank")}
                className="p-1.5 rounded-xs border border-border text-secondary hover:text-primary hover:bg-[#F8F8F5]"
                title="View full preview"
                aria-label="View full preview"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={handleTriggerSelect}
              className="p-1.5 rounded-xs border border-border text-secondary hover:text-accent hover:bg-[#F8F8F5]"
              title="Replace file"
              aria-label="Replace file"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-xs border border-border text-secondary hover:text-red-600 hover:bg-[#F8F8F5]"
              title="Remove file"
              aria-label="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty / Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleTriggerSelect}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTriggerSelect();
            }
          }}
          className={`p-4 sm:p-5 rounded-sm border-2 border-dashed text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-accent bg-accent/5"
              : displayError
              ? "border-red-400 bg-red-50/20"
              : "border-border hover:border-accent/60 bg-[#F8F8F5]/80 hover:bg-[#F8F8F5]"
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-primary underline decoration-accent/60">
                Click to upload
              </span>{" "}
              <span className="text-secondary">or drag and drop</span>
            </div>
            <p className="text-[10px] font-mono text-secondary">
              JPEG, PNG, WebP, PDF &bull; Max {formatFileSize(maxSizeBytes)}
            </p>
          </div>
        </div>
      )}

      {/* Upload Error Display */}
      {displayError && (
        <div id={`${id}-error`} className="flex items-center gap-1.5 text-[11px] text-red-600 pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
