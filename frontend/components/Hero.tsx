"use client";

import { useEffect, useState } from "react";
import CardSlot from "./CardSlot";
import Loader from "./Loader";
import ResultCard from "./ResultCard";
import PersonIllustration from "./PersonIllustration";

type Side = "front" | "back";
type Stage = "upload" | "exiting" | "loading" | "result";

const loadingPhrases = [
  "Reading your card…",
  "Lining up the details…",
  "Almost there…",
];

export default function Hero() {
  const [images, setImages] = useState<{ front: string | null; back: string | null }>({
    front: null,
    back: null,
  });
  const [files, setFiles] = useState<{ front: File | null; back: File | null }>({
    front: null,
    back: null,
  });
  const [stage, setStage] = useState<Stage>("upload");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const bothFilled = !!images.front && !!images.back;

  function handleFile(side: Side, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => ({ ...prev, [side]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
    setFiles((prev) => ({ ...prev, [side]: file }));
  }

  function handleRemove(side: Side) {
    setImages((prev) => ({ ...prev, [side]: null }));
    setFiles((prev) => ({ ...prev, [side]: null }));
  }

  function handleAnalyse() {
    if (!bothFilled) return;
    setErrorMsg(null);
    setStage("exiting");
    window.setTimeout(() => setStage("loading"), 520);
  }

  async function fetchHistory() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/records?limit=20`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setHistory(json.records || []);
        }
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (stage !== "loading") return;

    setPhraseIndex(0);
    const phraseTimer = window.setInterval(() => {
      setPhraseIndex((i) => (i + 1) % loadingPhrases.length);
    }, 550);

    const abortController = new AbortController();

    async function uploadAndExtract() {
      if (!files.front || !files.back) {
        setErrorMsg("Please upload both front and back images.");
        setStage("upload");
        return;
      }

      const formData = new FormData();
      formData.append("front", files.front);
      formData.append("back", files.back);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/upload`, {
          method: "POST",
          body: formData,
          signal: abortController.signal,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || `Server returned status ${res.status}`);
        }

        const json = await res.json();
        if (json.success && json.data) {
          setResultData(json.data);
          setErrorMsg(null);
          // Wait slightly to let the loading state feel natural
          window.setTimeout(() => {
            setStage("result");
            fetchHistory();
          }, 800);
        } else {
          throw new Error(json.message || "Failed to parse CNIC data.");
        }
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error(err);
        setErrorMsg(err.message || "Error communicating with server.");
        window.setTimeout(() => {
          setStage("upload");
        }, 500);
      }
    }

    uploadAndExtract();

    return () => {
      window.clearInterval(phraseTimer);
      abortController.abort();
    };
  }, [stage, files]);

  function handleReset() {
    setImages({ front: null, back: null });
    setFiles({ front: null, back: null });
    setResultData(null);
    setStage("upload");
  }

  return (
    <section className="hero" id="upload">
      <style>{`
        .brand-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .brand-header .brand-title {
          margin: 0;
        }
        .history-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--sky-100);
          border: 1px solid var(--sky-300);
          color: var(--navy-700);
          padding: 8px 14px;
          border-radius: 20px;
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .history-btn:hover {
          background: var(--sky-300);
          color: var(--navy-900);
          transform: translateY(-1px);
        }
        .history-btn:active {
          transform: translateY(0);
        }
        .history-icon {
          animation: spinSlow 8s linear infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(11, 31, 58, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .drawer-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: min(400px, 90%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-left: 1px solid var(--line);
          box-shadow: -10px 0 30px rgba(11, 31, 58, 0.15);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .drawer.open {
          transform: translateX(0);
        }
        .drawer-header {
          padding: 20px;
          border-bottom: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .drawer-header h3 {
          margin: 0;
          font-family: var(--font-fraunces), serif;
          font-size: 1.4rem;
          color: var(--navy-900);
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: var(--ink-soft);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: var(--sky-100);
          color: var(--navy-900);
        }
        .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .history-item {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        .history-item:hover {
          border-color: var(--sky-500);
          box-shadow: 0 4px 12px rgba(62, 155, 219, 0.08);
          transform: translateY(-2px);
        }
        .history-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .history-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--navy-900);
        }
        .history-date {
          font-size: 0.72rem;
          color: var(--ink-soft);
          white-space: nowrap;
        }
        .history-cnic {
          font-family: monospace;
          font-size: 0.85rem;
          color: var(--red-600);
          font-weight: 600;
        }
        .history-address {
          font-size: 0.78rem;
          color: var(--ink-soft);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .no-history {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: var(--ink-soft);
          gap: 12px;
        }
        .no-history p {
          margin: 0;
          font-size: 0.9rem;
        }
        .error-banner {
          background: #FDEDEC;
          border: 1px solid #FADBD8;
          color: var(--red-600);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.85rem;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.04);
          text-align: left;
        }
        .error-banner button {
          background: none;
          border: none;
          color: var(--red-600);
          font-weight: 700;
          cursor: pointer;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="hero-inner">
        <div className="hero-copy">
          <div className="brand-header">
            <h1 className="brand-title">
              SHANAKHT<span className="dot">.</span>
            </h1>
            <button 
              className="history-btn"
              onClick={() => {
                fetchHistory();
                setDrawerOpen(true);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="history-icon">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Recent Scans
            </button>
          </div>
          
          <p className="tagline">The easiest way to extract your information</p>
          
          <p className="hero-desc">
            Upload the front and back of your CNIC and get clean, structured
            details back in seconds — no typing required.
          </p>

          {errorMsg && (
            <div className="error-banner">
              <span>{errorMsg}</span>
              <button onClick={() => setErrorMsg(null)}>✕</button>
            </div>
          )}

          <div className="stage">
            {(stage === "upload" || stage === "exiting") && (
              <div className="upload-row">
                <CardSlot
                  side="front"
                  label="Front of CNIC"
                  sub="Drop front side here, or click to browse"
                  preview={images.front}
                  filled={!!images.front}
                  exitClass={stage === "exiting" ? "exit-left" : ""}
                  onFile={handleFile}
                  onRemove={handleRemove}
                />
                <CardSlot
                  side="back"
                  label="Back of CNIC"
                  sub="Drop back side here, or click to browse"
                  preview={images.back}
                  filled={!!images.back}
                  exitClass={stage === "exiting" ? "exit-right" : ""}
                  onFile={handleFile}
                  onRemove={handleRemove}
                />
              </div>
            )}

            {stage === "loading" && <Loader text={loadingPhrases[phraseIndex]} />}
            {stage === "result" && resultData && (
              <ResultCard data={resultData} onReset={handleReset} />
            )}
          </div>

          <div
            className="analyse-row"
            style={{ visibility: stage === "upload" ? "visible" : "hidden" }}
          >
            <button
              className={`analyse-btn ${bothFilled ? "ready" : ""}`}
              disabled={!bothFilled}
              onClick={handleAnalyse}
            >
              Analyse My Card
            </button>
          </div>
        </div>

        <div className="hero-art">
          <PersonIllustration />
        </div>
      </div>

      {/* Drawer overlay */}
      <div 
        className={`drawer-overlay ${drawerOpen ? "open" : ""}`} 
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Recent Scans</h3>
          <button className="close-btn" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <div className="drawer-content">
          {history.length === 0 ? (
            <div className="no-history">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <p>No recent scans found</p>
            </div>
          ) : (
            history.map((record) => {
              // Extract date from ObjectId if possible, fallback to custom label
              let formattedDate = "Saved Record";
              try {
                if (record.record_id && record.record_id.length === 24) {
                  const timestamp = parseInt(record.record_id.substring(0, 8), 16) * 1000;
                  if (!isNaN(timestamp)) {
                    formattedDate = new Date(timestamp).toLocaleDateString("en-PK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                  }
                }
              } catch (e) {
                // Ignore parsing errors
              }

              return (
                <button 
                  key={record.record_id} 
                  className="history-item"
                  onClick={() => {
                    setResultData(record.data);
                    setStage("result");
                    setDrawerOpen(false);
                  }}
                >
                  <div className="history-item-header">
                    <span className="history-name">{record.data.name || "Unknown Name"}</span>
                    <span className="history-date">{formattedDate}</span>
                  </div>
                  <span className="history-cnic">{record.data.cnic_number}</span>
                  {record.data.address && (
                    <span className="history-address">{record.data.address}</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
