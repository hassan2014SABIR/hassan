const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const contacts = [];

function addContact() {
  rl.question('Enter contact name: ', name => {
    rl.question('Enter phone number: ', phoneNumber => {
      contacts.push({ name, phoneNumber });
      console.log('Contact added successfully!');
      showMenu();
    });
  });
}

function viewContacts() {
  if (contacts.length === 0) {
    console.log('No contacts found.');
  } else {
    console.log('Contacts:');
    contacts.forEach((contact, index) => {
      console.log(`${index + 1}. Name: ${contact.name}, Phone: ${contact.phoneNumber}`);
    });
  }
  showMenu();
}

function searchContact() {
  rl.question('Enter name to search: ', name => {
    const contact = contacts.find(contact => contact.name === name);
    if (contact) {
      console.log(`Contact found - Name: ${contact.name}, Phone: ${contact.phoneNumber}`);
    } else {
      console.log('Contact not found.');
    }
    showMenu();
  });
}

function showMenu() {
  console.log('\nMenu:');
  console.log('1. Add a contact');
  console.log('2. View all contacts');
  console.log('3. Search for a contact');
  console.log('4. Exit');

  rl.question('Select an option: ', option => {
    switch (option) {
      case '1':
        addContact();
        break;
      case '2':
        viewContacts();
        break;
      case '3':
        searchContact();
        break;
      case '4':
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid option. Please select a valid option.');
        showMenu();
        break;
    }
  });
}

console.log('Welcome to the Contacts App!\n');
showMenu();