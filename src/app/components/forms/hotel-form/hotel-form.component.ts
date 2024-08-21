import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [],
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss'
})
export class HotelFormComponent {
  @Input({ required: true }) form!: AbstractControl | null;
}
