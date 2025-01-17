import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { map, Observable } from 'rxjs';
import { IQuestionStrategy } from '../question.strategy';

@Component({
  selector: 'app-question-multi-answers',
  imports: [
    AsyncPipe,
    FormsModule,
    MatButton,
    MatCheckbox,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInputModule,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './question-multi-answers.component.html',
  styleUrl: './question-multi-answers.component.css'
})
export class QuestionMultiAnswersComponent implements IQuestionStrategy {
  private formBuilder = inject(FormBuilder);

  question = this.formBuilder.group({
    question: ['', Validators.required],
    answers: this.formBuilder.array([], [Validators.required]),
  });

  public addAnswer() {
    const answerGroup = this.formBuilder.group({
      answer: ['', Validators.required],
      correct: [false],
    });

    (this.question.get('answers') as FormArray).push(answerGroup);
  }

  public answersIsInvalid$: Observable<boolean> =
    this.question.controls.answers.statusChanges.pipe(map(() =>
        (this.question.controls.answers.invalid || this.question.controls.answers.touched) &&
        (this.question.get('answers') as FormArray).length < 2,
      ),
    );

  hasAtLeastOneCorrectAnswer(): boolean {
    return (this.question.get('answers') as FormArray).controls.some(answer => answer.get('correct')?.value);
  }

  public removeAnswer(index: number) {
    (this.question.get('answers') as FormArray).removeAt(index);
  }

  saveQuestion() {
    console.log(this.question.value);
  }
}
