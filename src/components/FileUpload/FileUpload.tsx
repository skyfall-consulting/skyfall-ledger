/**
 * Skyfall Ledger -- <FileUpload />
 *
 * Drag-and-drop file upload zone with click-to-browse fallback.
 * Validates file size and surfaces selected files in an accessible list.
 * Uses the `.ledger-file-dropzone` primitive class for hover/focus/drag
 * pseudo-state transitions that cannot be expressed as inline styles.
 */
import * as React from 'react';
import { fontFamily, fontSize, fontWeight } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface FileUploadProps {
  /** Accepted file types (e.g. ".pdf,.jpg,image/*"). */
  accept?: string;
  /** Allow selecting multiple files at once. @default false */
  multiple?: boolean;
  /** Maximum file size in bytes. Files exceeding this are rejected. */
  maxSize?: number;
  /** Callback fired with the current file array after selection or removal. */
  onFilesSelected?: (files: File[]) => void;
  /** Disables the dropzone and prevents interaction. @default false */
  disabled?: boolean;
  /** External error message displayed below the dropzone. */
  error?: string;
  /** Additional CSS class applied to the root wrapper. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Format a byte count into a human-readable size string. */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------
const UploadIcon = () => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 20V8M16 8l-5 5M16 8l5 5" />
    <path d="M4 22v4a2 2 0 002 2h20a2 2 0 002-2v-4" />
  </svg>
);

const FileIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z" />
    <path d="M9 1v4h4" />
  </svg>
);

const RemoveIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M2 2l8 8M10 2l-8 8" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFilesSelected,
  disabled = false,
  error,
  className,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [sizeError, setSizeError] = React.useState<string | null>(null);

  const processFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const selected = Array.from(fileList);

      if (maxSize) {
        const oversized = selected.filter((f) => f.size > maxSize);
        if (oversized.length > 0) {
          setSizeError(
            `File(s) exceed maximum size of ${formatFileSize(maxSize)}`,
          );
          return;
        }
      }

      setSizeError(null);
      setFiles(selected);
      onFilesSelected?.(selected);
    },
    [maxSize, onFilesSelected],
  );

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesSelected?.(next);
  };

  const displayError = error || sizeError;

  // -- Styles ---------------------------------------------------------------

  const rootStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    fontFamily: fontFamily.sans,
  };

  const dropzoneStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[3],
    padding: space[8],
    border: '2px dashed var(--ledger-color-border-default)',
    borderRadius: radius.lg,
    background: 'var(--ledger-color-surface-default)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition:
      'border-color var(--ledger-duration-short) var(--ledger-easing-settle), background var(--ledger-duration-short) var(--ledger-easing-settle)',
    ...(disabled ? { opacity: 0.5 } : {}),
    ...(isDragging
      ? {
          borderColor: 'var(--ledger-color-teal-500)',
          background: 'rgba(46, 230, 198, 0.05)',
        }
      : {}),
  };

  const iconStyle: React.CSSProperties = {
    color: isDragging
      ? 'var(--ledger-color-teal-500)'
      : 'var(--ledger-color-text-muted)',
    display: 'flex',
  };

  const textStyle: React.CSSProperties = {
    margin: 0,
    fontSize: fontSize['body-md'],
    color: 'var(--ledger-color-text-secondary)',
    textAlign: 'center',
  };

  const linkStyle: React.CSSProperties = {
    fontWeight: fontWeight.semibold,
    color: 'var(--ledger-color-teal-500)',
  };

  const hintStyle: React.CSSProperties = {
    margin: 0,
    fontSize: fontSize['body-sm'],
    color: 'var(--ledger-color-text-muted)',
  };

  const fileListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: space[3],
  };

  const fileItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[4],
    padding: `${space[4]} ${space[5]}`,
    borderRadius: radius.md,
    background: 'var(--ledger-color-surface-sunken)',
    fontSize: fontSize['body-md'],
    color: 'var(--ledger-color-text-primary)',
  };

  const fileNameStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: fontWeight.medium,
  };

  const fileSizeStyle: React.CSSProperties = {
    flexShrink: 0,
    fontSize: fontSize['body-sm'],
    color: 'var(--ledger-color-text-muted)',
  };

  const removeBtnStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    padding: 0,
    border: 'none',
    borderRadius: radius.xs,
    background: 'transparent',
    color: 'var(--ledger-color-text-muted)',
    cursor: 'pointer',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: fontSize['body-sm'],
    color: 'var(--ledger-color-negative)',
    margin: 0,
  };

  // -- Render ---------------------------------------------------------------

  return (
    <div className={cn(className)} style={rootStyle}>
      {/* Dropzone */}
      <div
        className={cn(
          'ledger-file-dropzone',
          'ledger-focus-ring',
          isDragging && 'ledger-file-dropzone--dragging',
        )}
        style={dropzoneStyle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label={`Upload file${multiple ? 's' : ''}`}
        aria-disabled={disabled}
        {...(disabled ? { 'data-disabled': '' } : {})}
      >
        <span style={iconStyle}>
          <UploadIcon />
        </span>
        <p style={textStyle}>
          <span style={linkStyle}>Click to upload</span> or drag and drop
        </p>
        {accept && <p style={hintStyle}>{accept.replace(/,/g, ', ')}</p>}
        {maxSize && (
          <p style={hintStyle}>Max size: {formatFileSize(maxSize)}</p>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Selected file list */}
      {files.length > 0 && (
        <ul style={fileListStyle} aria-label="Selected files">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} style={fileItemStyle}>
              <span style={{ display: 'flex', flexShrink: 0, color: 'var(--ledger-color-text-muted)' }}>
                <FileIcon />
              </span>
              <span style={fileNameStyle}>{file.name}</span>
              <span style={fileSizeStyle}>{formatFileSize(file.size)}</span>
              <button
                type="button"
                className="ledger-focus-ring"
                style={removeBtnStyle}
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
              >
                <RemoveIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error display */}
      {displayError && (
        <span role="alert" style={errorStyle}>
          {displayError}
        </span>
      )}
    </div>
  );
}

FileUpload.displayName = 'FileUpload';
