const Checkbox = ({ label, checked, onChange }) => (
    <div >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        
      />
      <label >{label}</label>
    </div>
  );
  
  export default Checkbox;
