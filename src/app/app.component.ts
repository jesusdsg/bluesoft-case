import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './common/spinner/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bluesoft';
}
