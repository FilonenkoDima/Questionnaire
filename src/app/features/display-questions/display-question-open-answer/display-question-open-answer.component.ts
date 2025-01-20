import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { allQuestion, QuestionService } from '../../../core/shared/services/question.service';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  questionData = input.required<any>();
  answer?: string;
  question?: string;
  userAnswer?: string;

  inputAnswer = this.formBuilder.group({
    answer: ['', Validators.required],
  });

  ngOnInit() {
    console.log(this.questionData());
    this.question = this.questionData().question;
    this.answer = this.questionData().data.answer;
    this.userAnswer = this.questionData().data.userAnswer;
  }

  onAnswer() {
    this.questionService.answerQuestion(this.questionData().id, { answer: this.answer, userAnswer: this.inputAnswer.value.answer } as allQuestion)
  }

  onReAnswer() {
    this.questionService.reAnswerQuestion(this.questionData().id)
  }

  onEdit(){
    this.router.navigate(['/home/questions-management/create-question/question-open-answer'], {
      queryParams: { id: this.questionData().id }
    }).catch(err => console.error('Navigation error:', err));
  }

  onDelete() {
    console.log(1)
    this.questionService.deleteQuestion(this.questionData().id)
  }
}
