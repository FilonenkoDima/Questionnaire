import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATHS_ROUTES } from '../../core/shared/enums/paths.enum';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  homePath: string = PATHS_ROUTES.HOME;
  manageQuestionsPath: string = PATHS_ROUTES.QUESTIONS_MANAGEMENT;
  listOfQuestionsPath: string = PATHS_ROUTES.LIST_OF_QUESTIONS;
}
