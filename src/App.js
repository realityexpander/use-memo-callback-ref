import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Count, CountMemoized } from "./Count"

// How to use memo in React to Optimize Renders
// https://www.youtube.com/watch?v=o-alRbk_zP0

function App() {
  const [text, setText] = React.useState("");

  // const onEven = React.useCallback( () => setDataEven(true)  )
  function onEven() { setDataEven(true) }
  const onOdd = React.useCallback( () =>  setDataEven(false) );
  // const resetTextCallback = React.useCallback( () => setText("") );
  const resetTextCallback = () => { setText("") }
  
  const data = { isEven: false};

  function setDataEven(value) {
    data.isEven = value
    console.log("setDataEven=", data.isEven)
  }

  return (
    <div className="App">
      <input value = {text} onChange={e => setText(e.target.value)} />
      <Count onEven={onEven} onOdd={onOdd} setText={setText} resetTextCallback={resetTextCallback} data={data} />

    </div>
  );
}

export default App;



// Note: This Count causes component to re-render due to 'data' object being recreated with {}'s
// function App() {
//   const [text, setText] = React.useState("");

//   const onOdd = React.useCallback( () => setText(""), [setText]);
//   const data = { isEven: false};

//   return (
//     <div className="App">
//       <input value = {text} onChange={e => setText(e.target.value)} />
//       <Count onOdd={onOdd} data={data} />
//     </div>
//   );
// }



// NOTE: This Count component causes re-renders due to new onOdd anon function being created with {}'s
// function App() {
//   const [text, setText] = React.useState("");

//   const onOdd = React.useCallback( () => setText(""), [setText]);
//   const data = { isEven: false};

//   return (
//     <div className="App">
//       <input value = {text} onChange={e => setText(e.target.value)} />
//       <Count 
//         onOdd={ () => {
//           setText("")
//         }}
//       /> 

//     </div>
//   );
// }