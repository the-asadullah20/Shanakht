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
  const [stage, setStage] = useState<Stage>("upload");
  const [phraseIndex, setPhraseIndex] = useState(0);

  const bothFilled = !!images.front && !!images.back;

  function handleFile(side: Side, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => ({ ...prev, [side]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  }

  function handleRemove(side: Side) {
    setImages((prev) => ({ ...prev, [side]: null }));
  }

  function handleAnalyse() {
    if (!bothFilled) return;
    setStage("exiting");
    window.setTimeout(() => setStage("loading"), 520);
  }

  useEffect(() => {
    if (stage !== "loading") return;

    setPhraseIndex(0);
    const phraseTimer = window.setInterval(() => {
      setPhraseIndex((i) => (i + 1) % loadingPhrases.length);
    }, 550);

    const doneTimer = window.setTimeout(() => {
      window.clearInterval(phraseTimer);
      setStage("result");
    }, 1500);

    return () => {
      window.clearInterval(phraseTimer);
      window.clearTimeout(doneTimer);
    };
  }, [stage]);

  function handleReset() {
    setImages({ front: null, back: null });
    setStage("upload");
  }

  return (
    <section className="hero" id="upload">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="brand-title">
            SHANAKHT<span className="dot">.</span>
          </h1>
          <p className="tagline">The easiest way to extract your information</p>
          <p className="hero-desc">
            Upload the front and back of your CNIC and get clean, structured
            details back in seconds — no typing required.
          </p>

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
            {stage === "result" && <ResultCard onReset={handleReset} />}
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
    </section>
  );
}
