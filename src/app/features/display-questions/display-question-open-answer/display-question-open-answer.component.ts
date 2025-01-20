import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { QuestionService } from '../../../core/shared/services/question.service';

@Component({
  selector: 'app-display-question-open-answer',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './display-question-open-answer.component.html',
  styleUrl: './display-question-open-answer.component.css'
})
export class DisplayQuestionOpenAnswerComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private questionService = inject(QuestionService);

  questionData = input.required<any>();
  answer?: string;
  question?: string;
  userAnswer?: string;

  inputAnswer = this.formBuilder.group({
    answer: ['', Validators.required],
  });

  ngOnInit() {
    console.log(this.questionData());
    this.question = this.questionData().data.question;
    this.answer = this.questionData().data.answer;
    this.userAnswer = this.questionData().userAnswer;
  }

  onAnswer() {
    this.questionService.answerQuestion(this.questionData().id, this.inputAnswer.value.answer)
  }
}
