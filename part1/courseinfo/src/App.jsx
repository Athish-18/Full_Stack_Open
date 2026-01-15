// const Header = ({ course }) => {
//   return <h1>{course}</h1>;
// };

// const Part = ({ name, exercises }) => {
//   return (
//     <p>
//       {name} {exercises}
//     </p>
//   );
// };

// const Content = () => {
//   return (
//     <>
//       <Part name="Fundamentals of React" exercises={10} />
//       <Part name="Using props to pass data" exercises={7} />
//       <Part name="State of a component" exercises={14} />
//     </>
//   );
// };

// const Total = () => {
//   return <p>Number of exercises {10 + 7 + 14}</p>;
// };

// const App = () => {
//   return (
//     <>
//       <Header course="Half Stack application development" />
//       <Content />
//       <Total />
//     </>
//   );
// };

// export default App;

// const App = () => {
//   const course = "Half Stack application development";
//   const part1 = {
//     name: "Fundamentals of React",
//     exercises: 10,
//   };
//   const part2 = {
//     name: "Using props to pass data",
//     exercises: 7,
//   };
//   const part3 = {
//     name: "State of a component",
//     exercises: 14,
//   };

//   return (
//     <>
//       <h1> {course} </h1>
//       <p>
//         {part1.name} {part1.exercises}
//       </p>
//       <p>
//         {part2.name} {part2.exercises}
//       </p>
//       <p>
//         {part3.name} {part3.exercises}
//       </p>
//       <p>
//          Number of exercises {part1.exercises + part2.exercises + part3.exercises}
//       </p>
//     </>
//   );
// };
// export default App;

// const App = () => {
//   const course = "Half Stack application development";
//   const parts = [
//     {
//       name: "Fundamentals of React",
//       exercises: 10,
//     },
//     {
//       name: "Using props to pass data",
//       exercises: 7,
//     },
//     {
//       name: "State of a component",
//       exercises: 14,
//     },
//   ];

//   return (
//     <>
//       <h1>{course}</h1>
//       <p>
//         {parts[0].name} {parts[0].exercises}
//       </p>

//       <p>
//         {parts[1].name} {parts[1].exercises}
//       </p>

//       <p>
//         {parts[2].name} {parts[2].exercises}
//       </p>

//       <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises }</p>
//     </>
//   );
// };

// const App = () => {
//   const course = {
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: 7,
//       },
//       {
//         name: "State of a component",
//         exercises: 14,
//       },
//     ],
//   };

//   return (
//     <>
//       <h1>{course.name}</h1>
//       <p>
//         {course.parts[0].name} {course.parts[0].exercises}
//       </p>
//       <p>
//         {course.parts[1].name} {course.parts[1].exercises}
//       </p>
//       <p>
//         {course.parts[2].name} {course.parts[2].exercises}
//       </p>
//       <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises }</p>
//     </>
//   );
// };

//

// import { useState } from "react";

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   const all = good + neutral + bad;

//   return (
//     <>
//       <h1>give feedback</h1>

//       <button onClick={() => setGood(good + 1)}>good</button>
//       <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
//       <button onClick={() => setBad(bad + 1)}>bad</button>

//       <h2>statistics</h2>

//       <p>good {good}</p>
//       <p>neutral {neutral}</p>
//       <p>bad {bad}</p>
//       <p>all {all}</p>
//       <p>average {all === 0 ? 0 : (good - bad) / all}</p>
//       <p>positive {all === 0 ? 0 : (good / all) * 100} %</p>
//     </>
//   );
// };

// export default App;

// a proper place to define a component

// Version 2: Destructuring props for cleaner and more readable code
// good, neutral, bad are extracted from props at the function parameter level

// const Statistics = ({ good, neutral, bad }) => {
//   const all = good + neutral + bad;

//   return (
//     <>
//       <h1>Statistics</h1>

//       {/* Accessing values directly after destructuring */}
//       <p>Good {good}</p>
//       <p>Neutral {neutral}</p>
//       <p>Bad {bad}</p>

//       <p>All {all}</p>
//       <p>Average {all === 0 ? 0 : (good - bad) / all}</p>
//       <p>Positive {all === 0 ? 0 : (good / all) * 100} %</p>
//     </>
//   );
// };

// Version 1: Accessing values directly from the props object
// props is a single object that contains all passed values

// import { useState } from "react";
// const Statistics = (props) => {
//   const all = props.good + props.neutral + props.bad;
//   console.log(props.allClick);

//   if (props.allClick.length === 0) {
//     return (
//       <>
//         <h1>Statistics</h1>
//         <p>No Feedback Given</p>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <h1>Statistics</h1>
//         {/* 

//         {/* Accessing values using props.key */}
//         <p>Good {props.good}</p>
//         <p>Neutral {props.neutral}</p>
//         <p>Bad {props.bad}</p>

//         <p>All {all}</p>
//         <p>Average {all === 0 ? 0 : (props.good - props.bad) / all}</p>
//         <p>Positive {all === 0 ? 0 : (props.good / all) * 100} %</p>
//       </>
//     );
//   }
// }

  

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);
//   const [allClick,setClick]=useState([]);

//   const handleGood=()=>{
//     setGood(good+1);
//     setClick(allClick+1);
//   }

//   const handleNeutral = () => {
//     setNeutral(neutral + 1);
//     setClick(allClick + 1);
//   };

//   const handleBad = () => {
//     setBad(bad + 1);
//     setClick(allClick + 1);
//   };

//   return (
//     // ...
//     <>
//       <Statistics
//         good={good}
//         neutral={neutral}
//         bad={bad}
//         allClick={allClick}
//       ></Statistics>

//       <button onClick={handleGood}>Good</button>
//        <button onClick={handleNeutral}>Neutral</button>
//       <button onClick={handleBad}>Bad</button>
//     </>
//   );
// };
// export default App;



const StaticLine=(props)=>
{ 
  return (
    <>
      <p>{props.text} {props.quality}</p>
    </>
  );
}


import { useState } from "react";
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setClick(allClick + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setClick(allClick + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setClick(allClick + 1);
  };

  return (
    // ...
    <>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <StaticLine text={"good"} quality={good}></StaticLine>
      <StaticLine text={"neutral"} quality={neutral}></StaticLine>
      <StaticLine text={"bad"} quality={bad}></StaticLine>
      <StaticLine text={"all"} quality={good + bad + neutral}></StaticLine>
      <StaticLine
        text={"average"}
        quality={good+bad+neutral === 0 ? 0 : (good -bad) / good+bad+neutral}
      ></StaticLine>

      <StaticLine text={"positive"} quality={good + bad + neutral === 0 ? 0 : (good / (good + bad + neutral)) * 100 + " %"}></StaticLine>
    </>
  );
};
export default App;

