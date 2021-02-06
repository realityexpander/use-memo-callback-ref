import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Count, CountMemoized } from "./Count"

// How to use memo in React to Optimize Renders
// https://www.youtube.com/watch?v=o-alRbk_zP0


// Warnings for some updates during render
// https://reactjs.org/blog/2020/02/26/react-v16.13.0.html#new-warnings

function App() {
  const [text, setText] = React.useState("");
  const [text2, setText2] = React.useState("");

  // const onEven = React.useCallback( () => setDataEven(true)  )
  function onEven() { setDataEven(true) }
  const onOdd = React.useCallback( () =>  setDataEven(false) );
  // const resetTextCallback = React.useCallback( () => setText("") );
  const resetTextCallback = () => { setText("") }
  
  // const data = { isEven: false };
  
  const data = React.useMemo(
   () => ({
      text2,
      isEvenText2: text2.length % 2 === 0
   }),
   [text2] 
  )

  function setDataEven(value) {
    data.isEven = value
  }

  return (
    <div className="App">
      <input value = {text} onChange={e => setText(e.target.value)} />
      <input value = {text2} onChange={e => setText2(e.target.value)} placeholder="text2"/>
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