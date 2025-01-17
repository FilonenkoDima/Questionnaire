import { Injectable } from '@angular/core';
import { QuestionType } from '../enums/questionTypes.enum';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  saveQuestion(questionType: QuestionType, data: any) {
    const dataToSave: string = JSON.stringify({
      type: questionType,
      dateCreated: new Date().getDate(),
      data: data
    });
    localStorage.setItem(Guid.create().toString(), dataToSave);
  }
}
