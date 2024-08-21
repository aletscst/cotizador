import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss'
})
export class GeneralFormComponent {
  @Input({ required: true }) form!: AbstractControl | null;

  get generalForm(): FormGroup {
    return this.form as FormGroup;
  }
}
