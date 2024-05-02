import { type User } from "../types"

interface Props{
  users: User[],
  showColors: boolean,
  handleDelete: (index: number) => void,
  
}

const UsersList = ({ users, showColors, handleDelete }: Props) => {
  
  
  return (
    <table style={{border: '1px solid gray', width: '100%'}}>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody style={{border: '1px solid gray'}}>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'


          return (
            <tr key={user.email} style={{backgroundColor: color}}>
              <td>
                <img src={user.picture.thumbnail} alt={`${user.name} image`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={()=> handleDelete(index)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UsersList