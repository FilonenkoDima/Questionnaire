import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { IQuestionStrategy } from '../question.strategy';

@Component({
  selector: 'app-question-open-answer',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatInputModule,
    MatIconButton,
    MatButton
  ],
  templateUrl: './question-open-answer.component.html',
  styleUrl: './question-open-answer.component.css'
})
export class QuestionOpenAnswerComponent implements IQuestionStrategy {
  private formBuilder = inject(FormBuilder);

  question = this.formBuilder.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
  });

  saveQuestion() {
    console.log(this.question.value);
  }
}
