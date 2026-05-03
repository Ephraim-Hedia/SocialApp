import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VALIDATION_MESSAGES } from './validation-messages';

@Injectable({ providedIn: 'root' })
export class ValidationService {

  getErrorMessage(controlName: string, control: AbstractControl | null, form?: any): string | null {
    if (!control || !control.errors || !control.touched) return null;

    const messages = VALIDATION_MESSAGES[controlName];
    if (!messages) return null;

    // 🔥 handle normal errors
    for (const errorKey of Object.keys(control.errors)) {
      if (messages[errorKey]) {
        return messages[errorKey];
      }
    }

    // 🔥 handle form-level errors (like password mismatch)
    if (controlName === 'rePassword' && form?.errors?.['passwordMismatch']) {
      return messages['passwordMismatch'];
    }

    return null;
  }
}