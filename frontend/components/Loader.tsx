export default function Loader({ text }: { text: string }) {
  return (
    <div className="loading active">
      <div className="spinner" />
      <div className="loading-text">{text}</div>
    </div>
  );
}
