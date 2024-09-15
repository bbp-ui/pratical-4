// Person class definition
class Person {
    constructor(name) {
        this.name = name;
    }

    getDetails() {
        return `Name: ${this.name}`;
    }

    // Arrow function as a static method
    static greet = () => "Hello, welcome to our T-shirt store!";
}

// Student class definition extending Person
class Student extends Person {
    constructor(name, rollNo) {
        super(name);
        this.rollNo = rollNo;
    }

    getDetails() {
        if (this.rollNo <= 0) {
            throw new Error("Roll number must be greater than zero.");
        }
        return `${super.getDetails()}, Roll No: ${this.rollNo}`;
    }
}

// Validate the form input and calculate price
function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const message = document.getElementById('message').value.trim();
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;

    // Validation for mobile number (must be exactly 9 digits)
    const mobilePattern = /^\d{9}$/;
    if (!mobilePattern.test(mobile)) {
        alert('Mobile number must be exactly 9 digits.');
        return;
    }
    
    // Validation for message length
    if (message.length > 100) {
        alert('Message on T-Shirt must be 100 characters or less.');
        return;
    }

    // Calculate price based on size
    const sizePrices = {
        small: 150,
        medium: 120,
        large: 140,
        xlarge: 164
    };
    const price = sizePrices[size] || 0;
    document.getElementById('price').innerText = `Price: Rs ${price.toFixed(2)}`;

    // Create a Person object and print details
    const person = new Person(name);
    console.log(person.getDetails());

    // Create a Student object for demonstration
    try {
        const student = new Student(name, 1); // Example roll number
        console.log(student.getDetails());
    } catch (e) {
        alert(e.message);
        return;
    }

    // Process the order and generate a receipt
    const today = new Date();
    const receiptDate = today.toLocaleDateString();
    const receiptDetails = `
        <strong>Name:</strong> ${name}<br>
        <strong>Mobile No:</strong> ${mobile}<br>
        <strong>Message:</strong> ${message}<br>
        <strong>Color:</strong> ${color}<br>
        <strong>Size:</strong> ${size}<br>
        <strong>Price:</strong> Rs ${price.toFixed(2)}
    `;

    document.getElementById('receiptDate').innerText = `Receipt Date: ${receiptDate}`;
    document.getElementById('receiptDetails').innerHTML = receiptDetails;

    document.getElementById('receipt').classList.remove('hidden');
    document.querySelector('.order-summary').classList.remove('hidden');
    document.getElementById('orderDetails').innerHTML = receiptDetails;
}

// Attach the validation function to the form
document.getElementById('orderForm').addEventListener('submit', validateForm);
