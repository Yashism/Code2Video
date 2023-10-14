const InputBox = () => {
    const [text, setText] = useState('');
  
    const handleChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg font-semibold mb-2">Text</p>
        <label htmlFor="textbox" className="text-lg font-semibold mb-2">
          Enter your text:
        </label>
        <textarea
          id="textbox"
          className="w-full h-40 p-4 border border-gray-300 rounded-md"
          value={text}
          onChange={handleChange}
        ></textarea>
      </div>
    );
  };
  
  export default InputBox