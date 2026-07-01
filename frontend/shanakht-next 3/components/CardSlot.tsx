"use client";

import { useRef } from "react";

type Side = "front" | "back";

type Props = {
  side: Side;
  label: string;
  sub: string;
  preview: string | null;
  filled: boolean;
  exitClass: string;
  onFile: (side: Side, file: File) => void;
  onRemove: (side: Side) => void;
};

export default function CardSlot({
  side,
  label,
  sub,
  preview,
  filled,
  exitClass,
  onFile,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) return;
    onFile(side, file);
  }

  return (
    <label
      className={`card-slot ${filled ? "filled" : ""} ${exitClass}`}
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add("dragover");
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove("dragover");
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("dragover");
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15V3m0 0L7 8m5-5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 15v3a2 2 0 002 2h14a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="label">{label}</div>
      <div className="sub">{sub}</div>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="preview" src={preview} alt={`${label} preview`} />
      )}

      <button
        type="button"
        className="remove-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(side);
        }}
      >
        ✕
      </button>

      <span className="side-tag">{side === "front" ? "Front" : "Back"}</span>
    </label>
  );
}
