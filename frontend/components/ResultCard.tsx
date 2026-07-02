export type CNICData = {
  name?: string;
  father_name?: string;
  cnic_number: string;
  date_of_birth?: string;
  expiry_date?: string;
  address?: string;
};

type Props = {
  data: CNICData;
  onReset: () => void;
};

export default function ResultCard({ data, onReset }: Props) {
  return (
    <div className="result active">
      <div className="result-head">
        <h3>Card Details</h3>
        <span className="badge">Extracted</span>
      </div>

      <div className="field-grid">
        <div className="field full">
          <span className="flabel">Full Name</span>
          <span className="fval">{data.name || "N/A"}</span>
        </div>
        <div className="field">
          <span className="flabel">Father&apos;s Name</span>
          <span className="fval">{data.father_name || "N/A"}</span>
        </div>
        <div className="field">
          <span className="flabel">CNIC Number</span>
          <span className="fval">{data.cnic_number || "N/A"}</span>
        </div>
        <div className="field">
          <span className="flabel">Date of Birth</span>
          <span className="fval">{data.date_of_birth || "N/A"}</span>
        </div>
        <div className="field">
          <span className="flabel">Date of Expiry</span>
          <span className="fval">{data.expiry_date || "N/A"}</span>
        </div>
        <div className="field full">
          <span className="flabel">Address</span>
          <span className="fval">{data.address || "N/A"}</span>
        </div>
      </div>

      <button className="start-over" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
}
