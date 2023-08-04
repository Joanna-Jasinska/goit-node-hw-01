const fs = require("fs");
// const fs = require("fs").promises;
const argv = require("yargs").argv;
const path = require("node:path");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const contactsPath = path.join(__dirname, "db/contacts.json");
// const SEPARATOR = "\n=======================================================\n";
// const log = (data) => console.log(SEPARATOR, data, SEPARATOR);
// const data = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));

function invokeAction({ action, id, n, e, p }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      console.table(getContactById(id));
      break;

    case "add":
      console.table(addContact(n, e, p));
      break;

    case "remove":
      console.table(removeContact(id));
      break;
    case "delete":
      console.table(removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
// console.log(`[${[Object.keys(argv)]}]`);
// console.log(`[${[Object.values(argv)]}]`);
// console.log(`[${argv["_"]}]`);
// invokeAction({ action: argv["_"] });
// console.table(argv);
// console.table({ ...argv, action: argv["_"] });
// invokeAction({ ...argv, action: argv["_"] });
const action = Object.values(argv)[0][0];
invokeAction({ ...argv, action: action });

console.log("Enter command:");
console.log(
  "list | get --id id | delete --id id | add --n name --e email --p phone"
);
