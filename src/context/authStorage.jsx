const USER_KEY = "user";
const USERS_KEY = "sokoplus-users";

export function getSavedUser() {
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export function getRegisteredUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveRegisteredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email) {
  const users = getRegisteredUsers();
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

export function registerUser({ name, email, password }) {
  const users = getRegisteredUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "An account with this email already exists." };
  }
  const newUser = { name, email, password };
  users.push(newUser);
  saveRegisteredUsers(users);
  return { success: true, user: { name, email } };
}

export function loginUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) {
    return { success: false, error: "No account found with this email." };
  }
  if (user.password !== password) {
    return { success: false, error: "Incorrect password." };
  }
  return { success: true, user: { name: user.name, email: user.email } };
}
