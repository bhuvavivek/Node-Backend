const SessionIdToUserMap = new Map();

function SetUser(id, user) {
  SessionIdToUserMap.set(id, user);
}

function GetUser(id) {
  return SessionIdToUserMap.get(id);
}

module.exports = {
  SetUser,
  GetUser,
};
