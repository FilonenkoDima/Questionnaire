import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATHS_ROUTES } from "../../core/enums/paths.enum";

@Component({
  selector: 'app-question-management',
  imports: [
    RouterLink
  ],
  templateUrl: './question-management.component.html',
  styleUrl: './question-management.component.css'
})
export class QuestionManagementComponent {

  protected readonly PATHS_ROUTES = PATHS_ROUTES;
}
