const Person=({personsToShow})=>
{
  return (
    <>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.phn}
          </li>
        ))}
      </ul>
    </>
  );
}
export default Person;