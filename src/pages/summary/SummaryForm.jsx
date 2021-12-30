import React, { useState } from "react";

function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <input
        onChange={(e) => {
          setIsChecked(e.target.checked);
        }}
        type="checkbox"
        id="agree-checkbox"
      />
      <label htmlFor="agree-checkbox">I agree to Terms and Conditions</label>
      <button disabled={!isChecked}>Confirm Order</button>
    </div>
  );
}

export default SummaryForm;
