import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder) { }

  getOptionForm(): FormGroup {
    return this.fb.group({
      idOption: [0, [Validators.required]],
      name: ['opcion nueva', [Validators.required]],
      price: [0, [Validators.required]],
      relatedServices: this.fb.array([])
    });
  }

  getServiceForm(type: string): FormGroup {
    return this.fb.group({
      idService: [0, [Validators.required]],
      name: ['servicio nuevo', [Validators.required]],
      type: [type, [Validators.required]],
      general: this.getGeneralDataForm(),
      sim: type === 'SIM' ? this.getSimForm() : null,
      hotel: type === 'HOTEL' ? this.getHotelForm() : null
    });
  }

  getGeneralDataForm(): FormGroup {
    return this.fb.group({
      idService: [0, [Validators.required]],
      idQuote: ['0', [Validators.required]],
      price: [0, [Validators.required]],
      currency: ['MXN', [Validators.required]],
      initialDate: [new Date(), [Validators.required]],
    });
  }

  getSimForm(): FormGroup {
    return this.fb.group({
      simName: ['Sim 1', [Validators.required]],
      description: ['Sim 1 description', [Validators.required]],
      countrySim: ['MX', [Validators.required]],
    });
  }

  getHotelForm(): FormGroup {
    return this.fb.group({
      hotelName: ['Hotel 1', [Validators.required]],
      description: ['Hotel 1 description', [Validators.required]],
      countryHotel: ['ES', [Validators.required]],
    });
  }
}
