import { FormControl, ValidationErrors } from "@angular/forms";
export class CustomValidators {
    public static secondsValidator(duration: FormControl): ValidationErrors | null {
        if (duration != null) {
            let errors: any = {};
            if (!duration?.value?.match(/^[1-9]\d*\d+$/)) {
                errors.notAValidNumber = true;
            }
            if (isNaN(duration?.value)) {
                errors.ContainsCharacters = true;
            }

            return errors;
        }
        else {
            return null;
        }

    }
}