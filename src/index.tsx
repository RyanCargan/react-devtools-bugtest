import {
  createElement as E,
  useCallback,
  useDebugValue,
  useState
} from "react";
import * as ReactDOMClient from "react-dom/client";

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  useDebugValue({ count });

  return [count, increment];
}

export default function App() {
  const [count, increment] = useCounter();

  window.__REACT__increment = increment;
  console.log("RENDER!");

  return E(
    "div",
    {},
    E("h1", {}, count),
    E("button", { type: "button", onClick: increment }, "increment")
  );
}

const rootElement = document.getElementById("react-app");
const root = ReactDOMClient.createRoot(rootElement);

root.render(<App />);

const outsideRoot = document.getElementById("some-outside-app");
const el = document.createElement("button");
el.innerHTML = "increment (outside react)";

el.onclick = () => {
  // This doesn't work reliably when devtools are viewing the React tree:
  if (window.__REACT__increment) window.__REACT__increment();
  else console.error("No react increment function available!");
};

outsideRoot.appendChild(el);
