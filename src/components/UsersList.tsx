import { type User } from "../types"

interface Props{
  users: User[]
}

const UsersList = ({users}: Props) => {
  return (
    <table style={{border: '1px solid gray'}}>
      <thead >
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody style={{border: '1px solid gray'}}>
        {users.map((user) => {
          return (
            <tr key={user.id.value}>
              <td>
                <img src={user.picture.thumbnail} alt={`${user.name} image`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UsersList