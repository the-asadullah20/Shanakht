export default function ResultCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="result active">
      <div className="result-head">
        <h3>Card Details</h3>
        <span className="badge">Extracted</span>
      </div>

      <div className="field-grid">
        <div className="field full">
          <span className="flabel">Full Name</span>
          <span className="fval">Ahmed Raza Khan</span>
        </div>
        <div className="field">
          <span className="flabel">Father&apos;s Name</span>
          <span className="fval">Muhammad Raza Khan</span>
        </div>
        <div className="field">
          <span className="flabel">CNIC Number</span>
          <span className="fval">35202-1234567-1</span>
        </div>
        <div className="field">
          <span className="flabel">Date of Birth</span>
          <span className="fval">14 Aug 1998</span>
        </div>
        <div className="field">
          <span className="flabel">Gender</span>
          <span className="fval">Male</span>
        </div>
        <div className="field full">
          <span className="flabel">Address</span>
          <span className="fval">House 22, Street 5, Model Town, Multan</span>
        </div>
        <div className="field">
          <span className="flabel">Date of Issue</span>
          <span className="fval">02 Mar 2019</span>
        </div>
        <div className="field">
          <span className="flabel">Date of Expiry</span>
          <span className="fval">02 Mar 2029</span>
        </div>
      </div>

      <button className="start-over" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
}
