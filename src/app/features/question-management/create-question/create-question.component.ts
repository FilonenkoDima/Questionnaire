import { Component, inject } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { QuestionType } from '../../../core/shared/enums/questionTypes.enum';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

function atLeastOneCorrectAnswerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const answers = control.value;
    if (Array.isArray(answers) && answers.some((answer: any) => answer.correct)) {
      return null; // Валідний
    }
    return { noCorrectAnswer: true }; // Не валідний
  };
}

@Component({
  selector: 'app-create-question',
  imports: [
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    NgbModule,
    MatSelect,
    MatOption,
    MatIconButton,
    MatIcon,
    AsyncPipe,
    MatCheckboxModule
  ],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css'
})
export class CreateQuestionComponent {
  private formBuilder = inject(FormBuilder);

  selectedQuestionType!: QuestionType;
  questionTypes = Object.values(QuestionType);
  protected readonly QuestionType = QuestionType;

   // region singleAnswer
  questionSingleAnswer = this.formBuilder.group({
    question: ['', Validators.required],
    answers: this.formBuilder.array([], Validators.required),
    correctAnswerIndex: ['', Validators.required],
  });

  public addTestSingleAnswer() {
    const answerGroup = this.formBuilder.group({
      answer: ['', Validators.required],
    });

    (this.questionSingleAnswer.get('answers') as FormArray).push(answerGroup);
  }

  public answersIsInvalid$: Observable<boolean> =
    this.questionSingleAnswer.controls.answers.statusChanges.pipe(map(() =>
        (this.questionSingleAnswer.controls.answers.invalid || this.questionSingleAnswer.controls.answers.touched) &&
        (this.questionSingleAnswer.get('answers') as FormArray).length < 2,
      ),
    );

  public removeAnswer(index: number) {
    (this.questionSingleAnswer.get('answers') as FormArray).removeAt(index);
  }

  addQuestionSingleAnswer() {
    console.log(this.questionSingleAnswer.value);
  }
  // endregion


  // region multiAnswers
  questionMultiAnswers = this.formBuilder.group({
    question: ['', Validators.required],
    answers: this.formBuilder.array([], [Validators.required, atLeastOneCorrectAnswerValidator]),
  });

  public addTestMultiAnswers() {
    const answerGroup = this.formBuilder.group({
      answer: ['', Validators.required],
      correct: [false],
    });

    (this.questionMultiAnswers.get('answers') as FormArray).push(answerGroup);
  }

  public multiAnswersIsInvalid$: Observable<boolean> =
    this.questionSingleAnswer.controls.answers.statusChanges.pipe(map(() =>
        (this.questionSingleAnswer.controls.answers.invalid || this.questionSingleAnswer.controls.answers.touched) &&
        (this.questionSingleAnswer.get('answers') as FormArray).length < 2,
      ),
    );

  hasAtLeastOneCorrectAnswer(): boolean {
    return (this.questionMultiAnswers.get('answers') as FormArray).controls.some(answer => answer.get('correct')?.value);
  }

  public removeMultiAnswer(index: number) {
    (this.questionMultiAnswers.get('answers') as FormArray).removeAt(index);
  }

  addQuestionMultiAnswer() {
    console.log(this.questionMultiAnswers.value);
  }
  // endregion

  formatQuestionType(questionType: string): string {
    return questionType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
