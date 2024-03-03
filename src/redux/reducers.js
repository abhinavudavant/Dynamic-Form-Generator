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
      case 'SUBMIT_FORM':
        return state;
      default:
        return state;
    }
  };
  export default formReducer;
  
