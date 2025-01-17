import { Component, inject, input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { map, Observable } from 'rxjs';
import { IQuestionStrategy } from '../question.strategy';
import { QuestionService } from '../../../../core/shared/services/question.service';
import { QuestionType } from '../../../../core/shared/enums/questionTypes.enum';

@Component({
  selector: 'app-question-single-answer',
  imports: [
    AsyncPipe,
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInputModule,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './question-single-answer.component.html',
  styleUrl: './question-single-answer.component.css'
})
export class QuestionSingleAnswerComponent implements IQuestionStrategy, OnInit {
  private formBuilder = inject(FormBuilder);
  private questionService = inject(QuestionService);

  inputData = input();

  question = this.formBuilder.group({
    question: ['', Validators.required],
    answers: this.formBuilder.array([], Validators.required),
    correctAnswerIndex: ['', Validators.required],
  });

  ngOnInit(): void {
    if(this.inputData()) {
      this.question.patchValue({
        question: this.inputData().question,
        correctAnswerIndex: data.correctAnswerIndex,
      });

      // Очищаємо існуючі елементи FormArray
      this.answers.clear();

      // Додаємо нові елементи з отриманих даних
      data.answers.forEach(answer => {
        this.answers.push(this.formBuilder.group({
          answer: [answer.answer, Validators.required]
        }));
      });
    }
  }

  public addAnswer() {
    const answerGroup = this.formBuilder.group({
      answer: ['', Validators.required],
    });

    (this.question.get('answers') as FormArray).push(answerGroup);
  }

  public answersIsInvalid$: Observable<boolean> =
    this.question.controls.answers.statusChanges.pipe(map(() =>
        (this.question.controls.answers.invalid || this.question.controls.answers.touched) &&
        (this.question.get('answers') as FormArray).length < 2,
      ),
    );

  public removeAnswer(index: number) {
    (this.question.get('answers') as FormArray).removeAt(index);
  }

  saveQuestion() {
    console.log(this.question.value);
    this.questionService.saveQuestion(QuestionType.QUESTION_SINGLE_ANSWER, this.question.value)
  }
}
