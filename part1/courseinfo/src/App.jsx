const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = () => {
  return (
    <>
      <Part name="Fundamentals of React" exercises={10} />
      <Part name="Using props to pass data" exercises={7} />
      <Part name="State of a component" exercises={14} />
    </>
  );
};

const Total = () => {
  return <p>Number of exercises {10 + 7 + 14}</p>;
};

const App = () => {
  return (
    <>
      <Header course="Half Stack application development" />
      <Content />
      <Total />
    </>
  );
};

export default App;
