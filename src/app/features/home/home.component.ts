import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { PATHS_ROUTES } from '../../core/enums/paths.enum';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  manageQuestionsPath: string = PATHS_ROUTES.QUESTIONS_MANAGEMENT;
  listOfQuestionsPath: string = PATHS_ROUTES.LIST_OF_QUESTIONS;
}
