const Dropdown = ({ label, options, value, onChange }) => (
    <div>
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      
    </div>
    
  );
  
  export default Dropdown;
