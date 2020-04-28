import {useState} from 'react';

const useCustomForm = () => {
  const [inputs, setInputs] = useState({});
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  return {
    handleInputChange,
    inputs
  };
};
export default useCustomForm;
