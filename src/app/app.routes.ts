import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { QuestionManagementComponent } from './features/question-management/question-management.component';
import { PageNotFoundComponent } from './core/shared/features/page-not-found/page-not-found.component';
import { CreateEditQuestionComponent } from './features/question-management/create-edit-question/create-edit-question.component';
import { PATHS_ROUTES } from './core/enums/paths.enum';
import {
  CreateEditQuestionSingleAnswerComponent
} from './features/question-management/create-edit-question/create-edit-question-single-answer/create-edit-question-single-answer.component';
import {
  CreateEditQuestionMultiAnswersComponent
} from './features/question-management/create-edit-question/create-edit-question-multi-answers/create-edit-question-multi-answers.component';
import {
  CreateEditQuestionOpenAnswerComponent
} from './features/question-management/create-edit-question/create-edit-question-open-answer/create-edit-question-open-answer.component';
import { DisplayQuestionComponent } from './features/display-questions/display-question.component';

export const routes: Routes = [
  { path: '', redirectTo: PATHS_ROUTES.HOME, pathMatch: 'full' },
  { path: PATHS_ROUTES.HOME, component: HomeComponent },
  { path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.QUESTIONS_MANAGEMENT}`, component: QuestionManagementComponent, },
  {
    path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.QUESTIONS_MANAGEMENT}/${PATHS_ROUTES.CREATE_QUESTION}`,
    component: CreateEditQuestionComponent, children: [
      { path: PATHS_ROUTES.QUESTION_SINGLE_ANSWER, component: CreateEditQuestionSingleAnswerComponent },
      { path: PATHS_ROUTES.QUESTION_OPEN_ANSWER, component:  CreateEditQuestionOpenAnswerComponent },
      { path: PATHS_ROUTES.QUESTION_MULTI_ANSWERS, component: CreateEditQuestionMultiAnswersComponent },
    ]
  },
  {
    path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.QUESTIONS_MANAGEMENT}/${PATHS_ROUTES.EDIT_QUESTION}`,
    component: CreateEditQuestionComponent,
  },
  { path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.LIST_OF_QUESTIONS}`, component: DisplayQuestionComponent, },
  { path: PATHS_ROUTES.INVALID_PATH, component: PageNotFoundComponent },
];
