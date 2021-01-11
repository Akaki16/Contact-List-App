// Contact constructor
class Contact {
    constructor(name, lastName, phoneNumber, email) {
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

// UI constructor
class UI {
    // Add contact
    addContactToList(contact) {
        const list = document.querySelector(".contact-list");
        // Create tr element (table row)
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.lastName}</td>  
        <td>${contact.phoneNumber}</td>  
        <td>${contact.email}</td>  
        <td><a href="#" class="delete">X</a></td>  
        `;
        // Append
        list.appendChild(row);
    }
    // Clear fields
    clearFields() {
        document.querySelector("#name").value = '';
        document.querySelector('#last_name').value = '';
        document.querySelector('#phone_number').value = '';
        document.querySelector('#email').value = '';
    }
    // Show alert
    showAlert(messege, className) {
        // Create div element
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Append
        div.appendChild(document.createTextNode(messege));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#contact-form');
        // Insert
        container.insertBefore(div, form);
        // Time out after 3 sec
        setTimeout( e => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    // Remove contact
    removeContact(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

// Add contact to list event listener
document.querySelector('#contact-form').addEventListener('submit', e => {
    // Get form values
    const name = document.querySelector('#name').value;
    const lastName = document.querySelector('#last_name').value;
    const phoneNumber = document.querySelector('#phone_number').value;
    const email = document.querySelector("#email").value;

    const contact = new Contact(name, lastName, phoneNumber, email);

    const ui = new UI();

    // Validate
    if (name === '' || lastName === '' || phoneNumber === '' || email === '') {
        // Show error messege
        ui.showAlert('please fill in all fields', 'error');
    } else {
        // Clear fields
        ui.clearFields();
        // Show success messege
        ui.showAlert('contact added', 'success');
        // Add contact to list
        ui.addContactToList(contact);
    }

    e.preventDefault();
});

// Delete contact form contact list event listener
document.querySelector('.contact-list').addEventListener('click', e => {
    const ui = new UI();
    // Delete contact from list
    ui.removeContact(e.target);
    // Show success messege
    ui.showAlert('contact removed', 'success');
});