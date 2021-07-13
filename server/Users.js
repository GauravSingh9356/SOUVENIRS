const users = [];
const addUser = ({ id, name, room, photo }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name == name && user.room == room
  );

  if (existingUser) return { error: 'UserName already taken' };

  const user = { id, name, room, photo };
  users.push(user);
  console.log(user + ' added');
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
  if (index != 1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id == id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => {
    if (user.room == room) return user;
  });
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
