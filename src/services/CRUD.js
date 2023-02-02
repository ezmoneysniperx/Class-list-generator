import firebase from "../firebase";

const db = firebase.ref("bilgiler/");

class CRUD {
  getAll() {
    return db;
  }

  create(tutorial) {
    return db.set(tutorial);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new CRUD();
