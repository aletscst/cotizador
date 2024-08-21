import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteFormComponent } from './components/forms/quote-form/quote-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuoteFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quotes-app';
}
