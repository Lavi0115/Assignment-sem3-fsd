const EventEmitter = require("events");

class BankAccount extends EventEmitter {
    constructor(balance = 0) {
        super();
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        this.emit("deposit", amount, this.balance);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            this.emit("insufficientBalance", amount, this.balance);
        } else {
            this.balance -= amount;
            this.emit("withdraw", amount, this.balance);
        }
    }
}


const account = new BankAccount(5000);


account.on("deposit", (amount, balance) => {
    console.log(`Deposited: ₹${amount}`);
    console.log(`Balance: ₹${balance}`);
});


account.on("withdraw", (amount, balance) => {
    console.log(`Withdrawn: ₹${amount}`);
    console.log(`Balance: ₹${balance}`);
});


account.on("insufficientBalance", (amount, balance) => {
    console.log("Insufficient Balance!");
    console.log(`You tried to withdraw: ₹${amount}`);
    console.log(`Available Balance: ₹${balance}`);
});

// Test
account.deposit(2000);
account.withdraw(3000);
account.withdraw(6000);