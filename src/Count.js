import React, { useEffect } from "react";

export const Count = React.memo(( { onEven, onOdd, setText, resetTextCallback, ...props }) => {
  const [count, setCount] = React.useState(0);
  const renders = React.useRef(0);

  useEffect( () => {
    console.log(props.data)
    // if (props.data.isEven) setText("")
    if (props.data.isEven) resetTextCallback()
  }, [props.data.isEven])

  return (
    <div className="App">
      <div>count: { count }</div>
      <div>renders: { renders.current++ }</div>
      <button
        onClick={ () => {
          setCount(c => {
            c = c + 1
            if ( c % 2 === 0) {
              // onEven()  // clear text only when count is even
              props.data.isEven = true
            } else {
              // onOdd()
              props.data.isEven = false
            }
            return c
          })
        }}
        >
          increment
        </button>
    </div>
  )
}, (prevProps, thisProps) => {
  // deep check of props objects
  if(prevProps.data.isEven !== thisProps.data.isEven) {
    return true; // do a re-render
  }
  return false; // dont re-render
});


// Only re-renders when the props or state changes
export const CountMemoized = React.memo(() => {
  const [count, setCount] = React.useState(0);
  const renders = React.useRef(0);

  return (
    <div className="App">
      <div>countMemoized: {count}</div>
      <div>rendersMemoized: {renders.current++}</div>
      <button
        onClick={ () => {
          setCount(c => c+1);
        }}
        >
          increment
        </button>
    </div>
  )
});

// Causes rerenders bc its a child component of parent, and always renders when parent state changes
export function CountAlwaysRendersWithParent() {
  const [count, setCount] = React.useState(0);
  const renders = React.useRef(0);

  return (
    <div className="App">
      <div>count: {count}</div>
      <div>renders: {renders.current++}</div>
      <button
        onClick={ () => {
          setCount(c => c+1);
        }}
        >
          increment
        </button>
    </div>
  )
};




// This causes re-renders when the 'data' prop object is passed in (bc value is not deep checked)
//
// export const Count = React.memo(({ onOdd }) => {
//   const [count, setCount] = React.useState(0);
//   const renders = React.useRef(0);

//   return (
//     <div className="App">
//       <div>count: {count}</div>
//       <div>renders: {renders.current++}</div>
//       <button
//         onClick={ () => {
//           if (count % 2 === 0) {
//             onOdd();
//           }
//           setCount(c => c+1);
//         }}
//         >
//           increment
//         </button>
//     </div>
//   )
// });  //<-- NOTE! lack of memo deep check func