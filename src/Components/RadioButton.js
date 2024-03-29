const RadioButton = ({ label, value, name, checked, onChange, className }) => {

  const sanitizedValue = value === null ? '' : value;

  return (
    <div className={className}>
      <label>
        <input
          type="radio"
          name={name}
          value={sanitizedValue}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
