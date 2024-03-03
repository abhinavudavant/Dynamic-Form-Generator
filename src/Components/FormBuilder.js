import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFormField, removeFormField } from '../redux/actions';
import TextField from './TextField';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';
import RadioButton from './RadioButton';

const FormBuilder = () => {
  const formFields = useSelector((state) => state.formFields);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [newTextFieldLabel, setNewTextFieldLabel] = useState('');
  const [newDropdownOptions, setNewDropdownOptions] = useState('');

  const getCurrentFormConfig = () => {
    return {
      fields: formFields.map((field) => ({
        id: field.id,
        type: field.type,
        label: field.label,
        value: formValues[field.id] || '',
      })),
      values: formValues,
    };
  };

  const handleAddField = (fieldType) => {
    console.log('Adding field of type:', fieldType);
    let newField;
  
    if (fieldType === 'dropdown') {
      const optionsArray = newDropdownOptions.split(',').map((option) => option.trim());
      newField = { id: Date.now(), type: fieldType, label: '', options: optionsArray };
    } else if (fieldType === 'radio') {
      newField = {
        id: Date.now(),
        type: fieldType,
        label: newTextFieldLabel,
        name: `radio_${Date.now()}`,
        value: '', 
      };
    } else {
      newField = {
        id: Date.now(),
        type: fieldType,
        label: newTextFieldLabel,
        value: '',
      };
      setNewTextFieldLabel('');
    }
  
    if (fieldType !== 'radio') {
      setFormValues((prevValues) => ({ ...prevValues, [newField.id]: newField.value }));
    }
  
    dispatch(addFormField(newField));
  };
  
  const handleRemoveField = (fieldId) => {
    dispatch(removeFormField(fieldId));
  };

  const handleInputChange = (fieldId, value) => {
    console.log('Input Value:', value);
    console.log('Form Values Before:', formValues);
  
    setFormValues((prevValues) => ({ ...prevValues, [fieldId]: value }));
  
    // Optionally log the updated form values for debugging
    console.log('Form Values After:', formValues);
  };

  const handleSubmit = () => {
    const errors = {};
    formFields.forEach((field) => {
      if (!formValues[field.id] && field.type !== 'checkbox' && field.type !== 'radio' && field.type !== 'dropdown') {
        errors[field.id] = 'This field is required.';
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    alert('Form submitted successfully!');
    console.log('Form Values:', formValues);
  };

  const handleSaveConfig = () => {
    const formConfig = {
      fields: formFields.map((field) => ({
        id: field.id,
        type: field.type,
        label: field.label,
        value: formValues[field.id] || '',
      })),
    };


    const jsonString = JSON.stringify(formConfig, null, 2);

    console.log('Form Configuration Saved:', jsonString);
  };
  const handleLoadConfig = () => {
    const currentFormConfig = getCurrentFormConfig();
    const jsonString = JSON.stringify(currentFormConfig, null, 2);

    try {
      const config = JSON.parse(jsonString);
      dispatch({ type: 'SET_FORM_FIELDS', payload: config.fields });
      setFormValues(config.values);
      console.log('Form Configuration Loaded:', config);
    } catch (error) {
      console.error('Error loading form configuration:', error);
    }
  };

  return (
    <div className="p-4">
      {formFields.map((field) => (
        <div key={field.id} className="mb-4 p-2 bg-gray-100 rounded">

          {field.type === 'text' && (
            <TextField
              label={field.label}
              value={formValues[field.id] || ''}s
              onChange={(value) => handleInputChange(field.id, value)}
              className="border p-2 rounded"
            />
          )}
          {field.type === 'dropdown' && (
            <Dropdown
              label={field.label}
              options={field.options || []}
              value={formValues[field.id] || ''}
              onChange={(value) => handleInputChange(field.id, value)}
              className="border p-2 rounded"
            />
          )}
          {field.type === 'checkbox' && (
            <Checkbox
              label={field.label}
              checked={formValues[field.id] || false}
              onChange={(checked) => handleInputChange(field.id, checked)}
              className="m-2"
            />
          )}
          {field.type === 'radio' && (
            <RadioButton
              label={field.label}
              value={field.value}
              name={field.name}
              checked={formValues[field.id] === field.value}
              onChange={(value) => handleInputChange(field.id, value)}
              className="m-2"
            />
          )}
          {formErrors[field.id] && <div className="text-red-500">{formErrors[field.id]}</div>}
          <button
            onClick={() => handleRemoveField(field.id)}
            className="bg-red-500 text-white p-2 rounded mt-2 "
          >
            Remove
          </button>
        </div>
      ))}

      <div className='flex justify-center mb-4 p-2 bg-gray-100 rounded'>

      

      <div className="mb-4 p-2 bg-gray-100 rounded mr-20">
        <h3>Field Name</h3>
        <input
          type="text"
          placeholder="Label for Text Field"
          value={newTextFieldLabel}
          onChange={(e) => setNewTextFieldLabel(e.target.value)}
          className="border p-2 rounded"
        />
        <br />
        
        <button
          onClick={() => handleAddField('text')}
          className="bg-blue-500 hover:bg-[#002F6C] text-white p-2 rounded mt-2 mx-0.5"
        >
          Add Text Field
        </button>
        
        <button
          onClick={() => handleAddField('checkbox')}
          className="bg-blue-500 hover:bg-[#002F6C] text-white p-2 rounded mt-2 mx-0.5"
        >
          Add Checkbox
        </button>
        <button
          onClick={() => handleAddField('radio')}
          className="bg-blue-500 hover:bg-[#002F6C] text-white p-2 rounded mt-2 mx-0.5"
        >
          Add Radio Button
        </button>
        
      </div>
      <div className='mb-4 p-2 bg-gray-100 rounded '>
      <h3>Field Name</h3>
      <input
          type="text"
          placeholder="Comma-separated values"
          value={newDropdownOptions}
          onChange={(e) => setNewDropdownOptions(e.target.value)}
          className="border p-2 rounded  "
        />
        <br />
        <button
          onClick={() => handleAddField('dropdown')}
          className="bg-blue-500 hover:bg-[#002F6C] text-white p-2 rounded mt-2 mx-0.5"
        >
          Add Dropdown
        </button>
      </div>
      
      </div>
      <div className='flex justify-center mb-4 p-2 bg-gray-100 rounded'>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-[#002F6C] text-white p-2 rounded mt-2 mx-0.5">
          Submit Form
        </button>
        <button onClick={handleSaveConfig} className="bg-blue-500 hover:bg-[#002F6C] text-white p-2 rounded mt-2 mx-0.5">
          Save Form Configuration
        </button>
        <button onClick={handleLoadConfig} className="bg-blue-500 hover:bg-[#002F6C] text-white p-2 rounded mt-2 mx-0.5">
          Load Form Configuration
        </button>   
      </div>
    </div>
  );
};

export default FormBuilder;
