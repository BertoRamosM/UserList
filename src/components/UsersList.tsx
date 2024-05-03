import { SortBy, type User } from "../types.d"

interface Props {
  users: User[];
  showColors: boolean;
  handleDelete: (email: string) => void;
  changeSorting: (sort: SortBy) => void;
}

const UsersList = ({
  changeSorting,
  users,
  showColors,
  handleDelete,
}: Props) => {
  return (
    <table style={{width: "100%" }}>
      <thead>
        <tr>
          <th>Picture</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>
            Name
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>
            Surname
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody style={{ border: "1px solid gray" }}>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : "transparent";

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt={`${user.name} image`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(user.email)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersList