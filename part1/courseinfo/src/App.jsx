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

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <>
      <h1>{course}</h1>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>

      <p>
        {parts[1].name} {parts[1].exercises}
      </p>

      <p>
        {parts[2].name} {parts[2].exercises}
      </p>

      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises }</p>
    </>
  );
};
export default App;
