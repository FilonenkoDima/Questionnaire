import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { QuestionManagementComponent } from './features/question-management/question-management.component';
import { CreateQuestionComponent } from './features/question-management/create-question/create-question.component';
import { ListOfQuestionsComponent } from './features/list-of-questions/list-of-questions.component';
import { PageNotFoundComponent } from './core/shared/features/page-not-found/page-not-found.component';
import { EditQuestionComponent } from './features/question-management/edit-question/edit-question.component';
import { PATHS_ROUTES } from './core/enums/paths.enum';
import {
  QuestionSingleAnswerComponent
} from './features/question-management/create-question/question-single-answer/question-single-answer.component';
import {
  QuestionMultiAnswersComponent
} from './features/question-management/create-question/question-multi-answers/question-multi-answers.component';
import {
  QuestionOpenAnswerComponent
} from './features/question-management/create-question/question-open-answer/question-open-answer.component';

export const routes: Routes = [
  { path: '', redirectTo: PATHS_ROUTES.HOME, pathMatch: 'full' },
  { path: PATHS_ROUTES.HOME, component: HomeComponent },
  { path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.QUESTIONS_MANAGEMENT}`, component: QuestionManagementComponent, },
  {
    path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.QUESTIONS_MANAGEMENT}/${PATHS_ROUTES.CREATE_QUESTION}`,
    component: CreateQuestionComponent, children: [
      { path: PATHS_ROUTES.QUESTION_SINGLE_ANSWER, component: QuestionSingleAnswerComponent },
      { path: PATHS_ROUTES.QUESTION_OPEN_ANSWER, component:  QuestionOpenAnswerComponent },
      { path: PATHS_ROUTES.QUESTION_MULTI_ANSWERS, component: QuestionMultiAnswersComponent },
    ]
  },
  {
    path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.QUESTIONS_MANAGEMENT}/${PATHS_ROUTES.EDIT_QUESTION}`,
    component: EditQuestionComponent,
  },
  { path: `${PATHS_ROUTES.HOME}/${PATHS_ROUTES.LIST_OF_QUESTIONS}`, component: ListOfQuestionsComponent, },
  { path: PATHS_ROUTES.INVALID_PATH, component: PageNotFoundComponent },
];
