import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../../models/quote.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { GeneralFormComponent } from '../forms/general-form/general-form.component';
import { SimFormComponent } from '../forms/sim-form/sim-form.component';
import { HotelFormComponent } from '../forms/hotel-form/hotel-form.component';
import { QuoteService } from '../../services/quote.service';
import { DropzoneImageComponent } from '../dropzone-image/dropzone-image.component';

export interface ModalServiceData {
  idQuote: number;
  service?: Service;
}

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GeneralFormComponent,
    SimFormComponent,
    HotelFormComponent,
    DropzoneImageComponent
  ],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss'
})
export class ServiceModalComponent {
  readonly dialogRef = inject(MatDialogRef<ServiceModalComponent>);
  readonly data = inject<ModalServiceData>(MAT_DIALOG_DATA);
  public selectedService: string = '';
  public servicesList: string[] = ['SIM', 'HOTEL'];
  private imageAdded!: File;

  public serviceForm!: FormGroup;
  constructor(private fb: FormBuilder, private formService: FormService, private quoteService: QuoteService) {
    if(this.data && this.data.service) {
      console.log(this.data.service);
      this.serviceForm = this.formService.getServiceForm(this.data.service.type);
      this.serviceForm.patchValue(this.data.service);
    }
  }

  selectServiceType() {
    this.serviceForm = this.formService.getServiceForm(this.selectedService);
  }

  save() {
    console.log(this.serviceForm.value);
    this.quoteService.addServiceToQuote(this.data.idQuote, this.serviceForm.value).subscribe({
      next: (service) => {
        this.serviceForm.patchValue(service);
        console.log(this.serviceForm.value);
        if(this.imageAdded) {
          this.sendImage(service.idService);
        } else {
          this.dialogRef.close(this.serviceForm.value);
        }
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelected(file: File) {
    this.imageAdded = file;
  }

  sendImage(idService: number) {
    console.log(this.imageAdded);
    let formData: FormData = new FormData();
    formData.append('file', this.imageAdded);
    formData.append('idService', idService.toString());

    //aqui va el servicio para subir la imagen. Cuando el servicio de guardar se haga, cerrar el modal
    this.dialogRef.close(this.serviceForm.value);
  }
}
