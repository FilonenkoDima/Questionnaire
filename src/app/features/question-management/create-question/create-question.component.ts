import { Component } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { QuestionType } from '../../../core/shared/enums/questionTypes.enum';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-create-question',
  imports: [
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatCheckboxModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css'
})
export class CreateQuestionComponent {
  selectedQuestionType!: QuestionType;
  questionTypes = Object.values(QuestionType);
  protected readonly QuestionType = QuestionType;

  formatQuestionType(questionType: string): string {
    return questionType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
