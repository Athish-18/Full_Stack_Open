const Filter=({findUser, findPerson})=>
{
  return(
    <>
    <input value={findUser} onChange={findPerson} />
    </>
  )
}
export default Filter;