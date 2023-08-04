const fs = require("fs");
const path = require("node:path");
// const nanoid = require("nanoid");
// import { nanoid } from "nanoid";

const contactsPath = path.join(__dirname, "db/contacts.json");
const time = new Date();
const SEPARATOR =
  "\n===================== " + time + " =====================\n";
const log = (data) => {
  console.table(data);
};

function randomId() {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz-".split("");

  var str = "";
  for (var i = 0; i < 21; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

const data = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));

function listContacts() {
  log(data);
}

function getContactById(contactId) {
  return data.filter((contact) => {
    return contact.id === contactId;
  });
}

function removeContact(contactId) {
  const deletedText = "-------DELETED-------";
  const removedContact = {
    id: `DELETED: ${contactId.substring(0, 9) + "..."}`,
    name: deletedText,
    email: deletedText,
    phone: deletedText,
  };

  fs.writeFileSync(
    contactsPath,
    JSON.stringify(
      data.filter((contact) => {
        return contact.id !== contactId;
      })
    )
  );
  return data.map((contact) => {
    if (contact.id === contactId) return removedContact;
    return contact;
  });
}

function addContact(
  name = "Allen Raymond",
  email = "nulla.ante@vestibul.co.uk",
  phone = "(992) 914-3792"
) {
  const contactId = randomId();
  const contact = {
    id: contactId,
    name: name,
    email: email,
    phone: phone,
  };
  const addedContact = {
    ...contact,
    id: `ADDED: ${contactId.substring(0, 11) + "..."}`,
  };
  data.push(contact);
  fs.writeFileSync(contactsPath, JSON.stringify(data));
  return data.map((contact) => {
    if (contact.id === contactId) return addedContact;
    return contact;
  });
}

// log(SEPARATOR);
// listContacts();
// log(SEPARATOR);
// listContacts();
// log(getContactById("AeHIrLTr6JkxGE6SN-0Rw"));
// log(removeContact("AeHIrLTr6JkxGE6SN-0Rw"));
// log(addContact("Allen Raymond", "nulla.ante@vestibul.co.uk", "(992) 914-3792"));
// log(SEPARATOR);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
