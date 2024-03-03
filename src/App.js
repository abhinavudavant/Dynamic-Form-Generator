import { Provider } from 'react-redux';
import FormBuilder from './Components/FormBuilder';
import store from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1 className='font-sans text-2xl font-bold text-[#16163f] flex justify-center mt-5'>Dynamic Form Generator</h1>
        <FormBuilder />
      </div>
    </Provider>
  );
};

export default App;
