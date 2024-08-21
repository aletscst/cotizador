import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quote, Service } from '../models/quote.model';
import { QUOTE_SERVICES_MOCK } from '../mocks/quote-services.mock';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor() { }

  createQuote(quote: Quote): Observable<Quote> {
    quote.idQuote = 1;
    return of(quote);
  }

  getServicesFromQuote(idQuote: number): Observable<Service[]> {
    return of(QUOTE_SERVICES_MOCK);
  }

  addServiceToQuote(idQuote: number, service: Service): Observable<Service> {
    service.general.idQuote = idQuote + '';
    service.idService = QUOTE_SERVICES_MOCK.length + 1;
    return of(service);
  }
}
