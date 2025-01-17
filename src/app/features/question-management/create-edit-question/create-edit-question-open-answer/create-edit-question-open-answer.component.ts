import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ICreateEditQuestionStrategy } from '../create-edit-question.strategy';
import { QuestionService } from '../../../../core/shared/services/question.service';
import { QuestionType } from '../../../../core/shared/enums/questionTypes.enum';

@Component({
  selector: 'app-create-edit-question-open-answer',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatInputModule,
    MatIconButton,
    MatButton
  ],
  templateUrl: './create-edit-question-open-answer.component.html',
  styleUrl: './create-edit-question-open-answer.component.css'
})
export class CreateEditQuestionOpenAnswerComponent implements ICreateEditQuestionStrategy {
  private formBuilder = inject(FormBuilder);
  private questionService: QuestionService = inject(QuestionService);

  question = this.formBuilder.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
  });

  saveQuestion() {
    this.questionService.saveQuestion(QuestionType.QUESTION_OPEN_ANSWER, this.question.value)
    console.log(this.question.value);
  }
}
