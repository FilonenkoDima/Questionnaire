import { Component, inject } from '@angular/core';
import { QuestionService } from '../../core/shared/services/question.service';
import { QuestionType } from '../../core/shared/enums/questionTypes.enum';
import {
  DisplayQuestionOpenAnswerComponent
} from './display-question-open-answer/display-question-open-answer.component';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-display-questions',
  imports: [
    DisplayQuestionOpenAnswerComponent,
    AsyncPipe
  ],
  templateUrl: './display-question.component.html',
  styleUrl: './display-question.component.css'
})
export class DisplayQuestionComponent {
  private questionService: QuestionService = inject(QuestionService);
  questions$=this.questionService.questions$

  toAnswerQuestions$ = this.questions$.pipe(
    map(questions => questions.filter(q => q.type === QuestionType.QUESTION_OPEN_ANSWER && !q.userAnswer))
  );

  answeredQuestions$ = this.questions$.pipe(
    map(questions => questions.filter(q => q.type === QuestionType.QUESTION_OPEN_ANSWER && q.userAnswer))
  );

  protected readonly QuestionType = QuestionType;
}
