import { QuestionType } from '../shared/enums/questionTypes.enum';

enum PATHS_ROUTE {
  INVALID_PATH = '**',
  HOME = 'home',
  QUESTIONS_MANAGEMENT = 'questions-management',
  CREATE_QUESTION = 'create-question',
  EDIT_QUESTION = 'edit-question',
  LIST_OF_QUESTIONS = 'list-of-questions',
}

export const PATHS_ROUTES = { ...PATHS_ROUTE, ...QuestionType }
