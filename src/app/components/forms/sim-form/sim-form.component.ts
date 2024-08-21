import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sim-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sim-form.component.html',
  styleUrl: './sim-form.component.scss'
})
export class SimFormComponent {
  @Input({ required: true }) form!: AbstractControl | null;

  get simForm(): FormGroup {
    return this.form as FormGroup;
  }
}
