const Course = (props) => {
  return (
    <>
      <Header course={props.course}></Header>
      <Content course={props.course}></Content>
      <Total course={props.course}></Total>
    </>
  );
};

const Total = (props) => {
  const totalval = props.course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);
  return (
    <>
      <p>total of {totalval}</p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <ul>
        {props.course.parts.map((part) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part course={props.course}></Part>
    </>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

export default Course;
