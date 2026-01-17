// const Total = (props) => {
//   const totalval = props.course.parts.reduce((total, part) => {
//     return (total + part.exercises);
//   }, 0);
//   return (
//     <>
//       <p>total of {totalval}</p>
//     </>
//   );
// };

// const Part = (props) => {
//   return (
//     <>
//       <ul>
//         {props.course.parts.map((part) => (
//           <li key={part.id}>
//             {part.name} {part.exercises}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// const Content = (props) => {
//   return (
//     <>
//       <Part course={props.course}></Part>
//     </>
//   );
// };

// const Header = (props) => {
//   return (
//     <>
//       <h1>{props.course.name}</h1>
//     </>
//   );
// };

// const Course = (props) => {
//   return (
//     <>
//       <Header course={props.course}></Header>
//       <Content course={props.course}></Content>
//       <Total course={props.course}></Total>
//     </>
//   );
// };

// const App = () => {
//   const course = {
//     id: 1,
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//         id: 1,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: 7,
//         id: 2,
//       },
//       {
//         name: "State of a component",
//         exercises: 14,
//         id: 3,
//       },
//     ],
//   };

//   return <Course course={course} />;
// };

// export default App;




import Course from "./Course.jsx"
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
    {courses.map((course=>
      <Course key={course.id} course={course}></Course>
    ))}
    </>
  )
};
export default App;