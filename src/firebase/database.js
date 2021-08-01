import { db } from "./firebase";

//all db oprations will be done here.
// example below
export const doCreateUser = (id, username, email) =>
  db.ref(`user/${id}`).set({
    username,
    email,
  });
