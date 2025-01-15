import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { QuestionManagementComponent } from './features/question-management/question-management.component';
import { CreateQuestionComponent } from './features/question-management/create-question/create-question.component';
import { ListOfQuestionsComponent } from './features/list-of-questions/list-of-questions.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { EditQuestionComponent } from './features/question-management/edit-question/edit-question.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/questions-management', component: QuestionManagementComponent, },
  { path: 'home/questions-management/create-question', component: CreateQuestionComponent, },
  { path: 'home/questions-management/edit-question', component: EditQuestionComponent, },
  { path: 'home/list-of-questions', component: ListOfQuestionsComponent, },
  { path: '**', component: PageNotFoundComponent },
];
