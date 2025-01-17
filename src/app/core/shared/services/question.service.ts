import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionType } from '../enums/questionTypes.enum';
import { Guid } from 'guid-typescript';

interface Question {
  id: string;
  type: QuestionType;
  dateCreated: number;
  data: any;
  userAnswer?: any;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questionsSubject = new BehaviorSubject<Question[]>(this.loadQuestionsFromLocalStorage());
  public questions$ = this.questionsSubject.asObservable();

  saveQuestion(questionType: QuestionType, data: any): void {
    const newQuestion: Question = {
      id: Guid.create().toString(),
      type: questionType,
      dateCreated: new Date().getTime(),
      data: data,
    };

    const currentQuestions = this.questionsSubject.value;
    const updatedQuestions = [...currentQuestions, newQuestion];

    this.saveQuestionToLocalStorage(newQuestion);
    this.questionsSubject.next(updatedQuestions);
  }

  private loadQuestionsFromLocalStorage(): Question[] {
    const questions: Question[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          try {
            const question = JSON.parse(storedData);
            if (question && question.type) {
              questions.push({ id: key, ...question });
            }
          } catch (error) {
            console.error(`Error parsing question from localStorage: ${error}`);
          }
        }
      }
    }

    return questions;
  }

  private saveQuestionToLocalStorage(question: Question): void {
    localStorage.setItem(question.id, JSON.stringify(question));
  }

  answerQuestion(questionId: string, answer: any): void {
    const currentQuestions = this.questionsSubject.value;
    const questionIndex = currentQuestions.findIndex((q) => q.id === questionId);

    if (questionIndex !== -1) {
      const updatedQuestion = {
        ...currentQuestions[questionIndex],
        userAnswer: answer,
      };

      const updatedQuestions = [...currentQuestions];
      updatedQuestions[questionIndex] = updatedQuestion;

      localStorage.setItem(questionId, JSON.stringify(updatedQuestion));
      this.questionsSubject.next(updatedQuestions);
    } else {
      console.warn(`Question with ID ${questionId} not found.`);
    }
  }
}
