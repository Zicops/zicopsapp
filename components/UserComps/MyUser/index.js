import UserTable from './UserTable';

export default function MyUser({ getUser }) {
  return (
    <>
      <UserTable selectedUser={getUser} />
    </>
  );
}
