import { FormGroup } from '@angular/forms';

export interface ICreateEditQuestionStrategy {
  question: FormGroup;
  saveQuestion: () => void;
}
