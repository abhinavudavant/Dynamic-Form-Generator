const initialState = {
    formFields: [],
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_FORM_FIELD':
        return {
          ...state,
          formFields: [...state.formFields, action.payload],
        };
      case 'REMOVE_FORM_FIELD':
        return {
          ...state,
          formFields: state.formFields.filter((field) => field.id !== action.payload),
        };
      // Add other cases for form submission, validation, etc.
      case 'SUBMIT_FORM':
        // Custom logic for form submission
        // You may want to handle validation here and update the state accordingly
        return state;
      default:
        return state;
    }
  };
  export default formReducer;
  
