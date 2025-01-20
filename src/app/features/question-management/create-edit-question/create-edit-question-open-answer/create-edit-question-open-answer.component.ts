import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ICreateEditQuestionStrategy } from '../create-edit-question.strategy';
import { allQuestion, Question, QuestionService } from '../../../../core/shared/services/question.service';
import { QuestionType } from '../../../../core/shared/enums/questionTypes.enum';
import { ActivatedRoute } from '@angular/router';

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
  private readonly route = inject(ActivatedRoute);

  questionFromStorage?: Question;

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    console.log(id);
    if (id) {
      this.questionFromStorage = this.questionService.getQuestionById(id);
      this.setData();
    }
  }

  question = this.formBuilder.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
  });

  setData() {
    if (this.questionFromStorage) {
      this.question.patchValue({
        question: this.questionFromStorage!.question,
        answer: this.questionFromStorage!.data.answer as string,
      });
    }
  }

  saveQuestion() {
    if (!this.questionFromStorage) {
      console.log('1')
      this.questionService.saveQuestion(QuestionType.QUESTION_OPEN_ANSWER, this.question.value.question!, {
        answer: this.question.value.answer!
      } as allQuestion);
    } else {
      this.questionFromStorage.question = this.question.value.question!;
      this.questionFromStorage.data.answer = this.question.value.answer!;
      this.questionService.updateQuestion(this.questionFromStorage!);
    }
    console.log(this.question.value);
  }
}
