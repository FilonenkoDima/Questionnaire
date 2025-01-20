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
import { ICreateEditQuestionStrategy } from '../create-edit-question.strategy';
import { QuestionService } from '../../../../core/shared/services/question.service';
import { QuestionType } from '../../../../core/shared/enums/questionTypes.enum';

interface IQuestion {
  type: QuestionType;
  dateCreated: number;
  data: {
    question: string;
    answers: { answer: string }[];
    correctAnswerIndex: number;
  };
}

@Component({
  selector: 'app-create-edit-question-single-answer',
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
  templateUrl: './create-edit-question-single-answer.component.html',
  styleUrl: './create-edit-question-single-answer.component.css'
})
export class CreateEditQuestionSingleAnswerComponent implements ICreateEditQuestionStrategy, OnInit {
  private formBuilder = inject(FormBuilder);
  private questionService = inject(QuestionService);

  inputData = input<IQuestion>({
    "type": "question-single-answer" as QuestionType,
    "dateCreated": 1737111765073,
    "data": { "question": "ry", "answers": [{ "answer": "rtyrye" }, { "answer": "reyrey" }], "correctAnswerIndex": 0 }
  });

  question = this.formBuilder.group({
    question: ['', Validators.required],
    answers: this.formBuilder.array([], Validators.required),
    correctAnswerIndex: [-1, Validators.required],
  });

  ngOnInit(): void {
    this.setData();
  }

  setData() {
    if (this.inputData()) {
      const data = this.inputData()?.data;
      this.question.patchValue({
        question: data?.question,
        correctAnswerIndex: data?.correctAnswerIndex,
      });

      this.question.controls.answers.clear();

      data?.answers.forEach(answer => {
        (this.question.get('answers') as FormArray).push(this.formBuilder.group({
          answer: [answer.answer, Validators.required],
        }))
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
    // this.questionService.saveQuestion(QuestionType.QUESTION_SINGLE_ANSWER, this.question.value)
  }
}
