import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { QuoteService } from '../../../services/quote.service';
import { Service } from '../../../models/quote.model';
import { MatDialog } from '@angular/material/dialog';
import { ServiceModalComponent } from '../../service-modal/service-modal.component';

@Component({
  selector: 'app-option-form',
  standalone: true,
  imports: [ReactiveFormsModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './option-form.component.html',
  styleUrl: './option-form.component.scss'
})
export class OptionFormComponent implements OnInit {
  @Input({ required: true }) form!: AbstractControl | null;

  readonly matDialog = inject(MatDialog);

  public services: Service[] = [];
  public selectedServices: Service[] = [];

  constructor(private quoteService: QuoteService) {
    
  }
  ngOnInit(): void {
    this.getServices();
  }

  get optionForm(): FormGroup {
    return this.form as FormGroup;
  }

  get relatedServices(): FormArray {
    return this.optionForm.get('relatedServices') as FormArray;
  }

  save() {
    
  }

  getServices() {
    this.quoteService.getServicesFromQuote(1).subscribe({
      next: (services) => {
        console.log(services);
        this.services = services.slice();
        this.relatedServices.controls.forEach((control) => {
          const service = this.services.find((s) => s.idService === control.value);
          if (service) {
            this.selectedServices.push(service);
            this.services.splice(this.services.indexOf(service), 1);
          }
        });
      }
    });
  }

  dropService(event: CdkDragDrop<Service[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.relatedServices.clear();
    this.selectedServices.forEach((service) => {
      this.relatedServices.push(new FormControl(service.idService));
    });
  }

  addService() {
    const dialogRef = this.matDialog.open(ServiceModalComponent, {
      height: '80%',
      width: '90%',
      disableClose: true,
      data: { idQuote: 1 },
    });

    dialogRef.afterClosed().subscribe((service) => {
      console.log(service);
      if (service) {
        this.services.push(service);
      }
    });
  }

  editService(service: Service) {
    const dialogRef = this.matDialog.open(ServiceModalComponent, {
      height: '80%',
      disableClose: true,
      data: { idQuote: 1, service },
    });
  }
}
