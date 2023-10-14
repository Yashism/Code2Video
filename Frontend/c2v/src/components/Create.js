import ConceptButton from "./ConceptBtn";
import CodeButton from "./CodeBtn";
import "./Create.css"

const InputBox = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-lg font-semibold mb-2">Text</p>
      <textarea
        id="textbox"
        className="w-full h-40 p-4 border border-gray-300 rounded-md"
        value={text}
        onChange={handleChange}
        placeholder="Enter your text"
      ></textarea>

      <div className="flex justify-between mt-4">
        <ConceptButton />
        <CodeButton />
      </div>
    </div>
  );
};

export default InputBox;