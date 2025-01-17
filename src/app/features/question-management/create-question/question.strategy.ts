import { FormGroup } from '@angular/forms';

export interface IQuestionStrategy {
  question: FormGroup;
  saveQuestion: () => void;
}
