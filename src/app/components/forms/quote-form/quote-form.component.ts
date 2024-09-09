import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OptionFormComponent } from '../option-form/option-form.component';
import { QuoteService } from '../../../services/quote.service';
import { FormService } from '../../../services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OptionFormComponent],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss'
})
export class QuoteFormComponent {
  public quoteForm: FormGroup;
  public selectedOption: number = 0;

  constructor(private fb: FormBuilder, private quoteService: QuoteService, private formService: FormService, private router: Router) {
    this.quoteForm = this.fb.group({
      idQuote: [0, [Validators.required]],
      name: ['', [Validators.required]],
      options: this.fb.array([]),
      services: this.fb.array([]),
    });
  }

  get options() {
    return this.quoteForm.get('options') as FormArray;
  }

  createQuote(){
    this.quoteService.createQuote(this.quoteForm.value).subscribe({
      next: (quote) => {
        this.quoteForm.patchValue(quote);
        this.addOption();
        console.log(this.quoteForm.value);
      }
    });
  }

  addOption() {
    this.options.push(this.formService.getOptionForm());
    this.selectOption(this.options.length - 1);
  }

  selectOption(index: number) {
    this.selectedOption = index;
  }

  save() {
    console.log(this.quoteForm.value);
    const newUrl = this.router.serializeUrl(this.router.createUrlTree(['formats/xipatlani-quote.html']));
    window.open(newUrl, '_blank');
  }
}
