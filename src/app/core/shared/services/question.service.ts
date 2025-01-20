import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionType } from '../enums/questionTypes.enum';
import { Guid } from 'guid-typescript';

export interface Question {
  id: string;
  type: QuestionType;
  dateCreated: number;
  question: string;
  data: allQuestion;
}

interface OpenAnswerQuestion {
  answer: string;
  userAnswer?: string;
}

interface SingleAnswerQuestion {
  answer: { answer: string }[];
  correctIndex: number;
  userAnswer?: number;
}

interface MultiAnswerQuestion {
  answer: { answer: string; correct: boolean }[];
  userAnswer?: string[];
}

export type allQuestion = OpenAnswerQuestion | SingleAnswerQuestion | MultiAnswerQuestion;

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questionsSubject = new BehaviorSubject<Question[]>(this.loadQuestionsFromLocalStorage());
  public questions$ = this.questionsSubject.asObservable();

  saveQuestion(questionType: QuestionType, question: string, data: allQuestion): void {
    const newQuestion: Question = {
      id: Guid.create().toString(),
      type: questionType,
      dateCreated: new Date().getTime(),
      question: question,
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

  answerQuestion(questionId: string, data: allQuestion): void {
    const currentQuestions = this.questionsSubject.value;
    const questionIndex = currentQuestions.findIndex((q) => q.id === questionId);

    if (questionIndex !== -1) {
      const updatedQuestion = {
        ...currentQuestions[questionIndex],
        data: data,
      };

      const updatedQuestions = [...currentQuestions];
      updatedQuestions[questionIndex] = updatedQuestion;

      localStorage.setItem(questionId, JSON.stringify(updatedQuestion));
      this.questionsSubject.next(updatedQuestions);
    } else {
      console.warn(`Question with ID ${questionId} not found.`);
    }
  }

  updateQuestion(question: Question): void {
    const currentQuestions = this.questionsSubject.value;
    const questionIndex = currentQuestions.findIndex((q) => q.id === question.id);

    if (questionIndex !== -1) {
      const updatedQuestions = [...currentQuestions];
      updatedQuestions[questionIndex] = question;

      localStorage.setItem(question.id, JSON.stringify(question));
      this.questionsSubject.next(updatedQuestions);
    } else {
      console.warn(`Question with ID ${question.id} not found.`);
    }
  }

  reAnswerQuestion(questionId: string): void {
    const currentQuestions = this.questionsSubject.value;
    const questionIndex = currentQuestions.findIndex((q) => q.id === questionId);

    if (questionIndex !== -1) {
      const updatedQuestion = {
        ...currentQuestions[questionIndex],
        data: { ...currentQuestions[questionIndex].data, userAnswer: undefined },
      };

      const updatedQuestions = [...currentQuestions];
      updatedQuestions[questionIndex] = updatedQuestion;

      localStorage.setItem(questionId, JSON.stringify(updatedQuestion));
      this.questionsSubject.next(updatedQuestions);
    } else {
      console.warn(`Question with ID ${questionId} not found.`);
    }
  }

  getQuestionById(questionId: string): Question {
    const currentQuestions = this.questionsSubject.value;
    const questionIndex = currentQuestions.findIndex((q) => q.id === questionId);

    if (questionIndex !== -1) {
      return currentQuestions[questionIndex]
    } else {
      console.warn(`Question with ID ${questionId} not found.`);
      throw new Error(`Question with ID ${questionId} not found.`);
    }
  }

  deleteQuestion(questionId: string): void {
    const currentQuestions = this.questionsSubject.value;
    const updatedQuestions = currentQuestions.filter(q => q.id !== questionId);

    if (currentQuestions.length === updatedQuestions.length) {
      console.warn(`Question with ID ${questionId} not found.`);
      return;
    }

    localStorage.removeItem(questionId);

    this.questionsSubject.next(updatedQuestions);
  }
}
