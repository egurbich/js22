// Міст (Bridge) — це паттерн програмування, який дозволяє розмістити абстракцію і реалізацію в окремі класи, дозволяючи їм мати незалежний функціонал

// Клас Participant представляє користувача, який може відправляти повідомлення.
class Participant {
  constructor(alias, communicator) {
    this.alias = alias; // Псевдонім користувача
    this.communicator = communicator; // Засіб комунікації
  }

  // Метод для відправлення повідомлення
  dispatchMessage(text) {
    const message = this.prepareMessage(text); // Підготовка повідомлення
    this.communicator.transmit(message); // Відправлення повідомлення за допомогою засобу комунікації
  }

  // Метод для підготовки повідомлення
  prepareMessage(text) {
    return `[${this.alias}]: ${text}`; // Форматування тексту повідомлення
  }
}

// Клас SMSCommunicator відповідає за відправку повідомлень через SMS.
class SMSCommunicator {
  // Статичний метод для відправлення SMS
  static transmit(message) {
    console.log(`Відправлено SMS: ${message}`); // Вивід інформації про відправлене SMS
  }
}

// Клас EmailCommunicator відповідає за відправку повідомлень через Email.
class EmailCommunicator {
  // Статичний метод для відправлення Email
  static transmit(message) {
    console.log(`Відправлено Email: ${message}`); // Вивід інформації про відправлене Email
  }
}

console.log("Завдання 7 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо двох користувачів - Max та Linda - які відправляють повідомлення за допомогою різних засобів комунікації.
const max = new Participant("Max", SMSCommunicator);
const linda = new Participant("Linda", EmailCommunicator);

// Max відправляє повідомлення через SMS.
max.dispatchMessage("Hello!"); // Виведе: Відправлено SMS: [Max]: Hello!

// Linda відправляє повідомлення через Email.
linda.dispatchMessage("Hello!"); // Виведе: Відправлено Email: [Linda]: Hello!
