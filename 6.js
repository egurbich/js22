// Ланцюжок відповідальності (Chain of Responsibility) — це паттерн програмування, який дозволяє передавати запити послідовно через ланцюжок обробників, кожен з яких може обробити або передати запит далі.

//AuthProcessor клас для обробки аутентифікації.
class AuthProcessor {
  constructor() {
    this.nextProcessor = null; // Поле для зберігання наступного обробника в ланцюгу
  }

  // Метод для встановлення наступного обробника
  setNextProcessor(processor) {
    this.nextProcessor = processor;
    return processor;
  }

  // Метод для перевірки аутентифікації
  validate(username, passkey) {
    if (this.nextProcessor) {
      return this.nextProcessor.validate(username, passkey); // Передача запиту на наступний обробник, якщо він існує
    }
    return false; // Повернення false, якщо наступного обробника немає
  }
}

// TwoStepProcessor Клас обробника, який перевіряє двофакторний код. Наслідує базовий клас AuthProcessor.
class TwoStepProcessor extends AuthProcessor {
  // Перевизначений метод для перевірки аутентифікації з двофакторною аутентифікацією
  validate(username, passkey) {
    if (
      username === "john" &&
      passkey === "password" &&
      this.isValidTwoStepCode()
    ) {
      console.log("Вхід дозволено з двофакторною аутентифікацією");
      return true;
    }
    return super.validate(username, passkey); // Передача запиту на батьківський обробник, якщо умова не виконується
  }

  // Метод для перевірки двофакторного коду
  isValidTwoStepCode() {
    // Логіка перевірки двофакторного коду
    return true;
  }
}

// RoleProcessor Клас обробника, який перевіряє ролі користувача. Наслідує базовий клас AuthProcessor.
class RoleProcessor extends AuthProcessor {
  // Перевизначений метод для перевірки аутентифікації з ролями користувача
  validate(username, passkey) {
    if (username === "guest") {
      console.log("Вхід дозволено з роллю гостя");
      return true;
    }
    return super.validate(username, passkey); // Передача запиту на батьківський обробник, якщо умова не виконується
  }
}

// CredentialsProcessor Клас обробника, який перевіряє облікові дані користувача. Наслідує базовий клас AuthProcessor.
class CredentialsProcessor extends AuthProcessor {
  // Перевизначений метод для перевірки аутентифікації за обліковими даними користувача
  validate(username, passkey) {
    if (username === "admin" && passkey === "admin123") {
      console.log("Вхід дозволено за обліковими даними");
      return true;
    }
    return super.validate(username, passkey); // Передача запиту на батьківський обробник, якщо умова не виконується
  }
}

// Клас Builder для створення об'єкта ланцюга обробників.
class ProcessorBuilder {
  constructor() {
    this.firstProcessor = null; // Перший обробник у ланцюгу
    this.lastProcessor = null; // Останній обробник у ланцюгу
  }

  // Метод для додавання нового обробника в ланцюг
  add(processor) {
    if (!this.firstProcessor) {
      this.firstProcessor = processor;
      this.lastProcessor = processor;
    } else {
      this.lastProcessor.setNextProcessor(processor);
      this.lastProcessor = processor;
    }
    return this;
  }

  // Метод для створення ланцюга обробників
  create() {
    return this.firstProcessor;
  }
}
console.log("Завдання 6 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо Builder для ланцюга обробників.
const processorBuilder = new ProcessorBuilder();

// Додаємо обробники в ланцюг за допомогою builder'а.
const processor = processorBuilder
  .add(new CredentialsProcessor())
  .add(new TwoStepProcessor())
  .add(new RoleProcessor())
  .create();

// Перевіряємо користувачів за допомогою нашого ланцюга обробників.
processor.validate("admin", "admin123"); // Вхід дозволено за обліковими даними
processor.validate("john", "password"); // Вхід дозволено з двоступінчастою аутентифікацією
processor.validate("guest", "guest123"); // Вхід дозволено з роллю гостя
processor.validate("user", "password"); // Вхід заборонено
