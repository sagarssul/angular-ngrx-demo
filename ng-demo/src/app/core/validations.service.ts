
// Custom form validations service
export class ValidationService {

  static emailValidator(control): any {
    if (control.value && control.value.match(/^(?!^\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      return null;
    } else {
      return { valid: false };
    }
  }

  static phoneValidator(control): any {
    if (control.value && control.value.match(/^((\\+91-?)|0)?[0-9]{10}$/)) {
      return null;
    } else {
      return { valid: false };
    }
  }

}
