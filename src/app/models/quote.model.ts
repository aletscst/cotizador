export interface Quote {
    idQuote: number;
    name: string;
    options: Option[];
    services: Service[];
}

export interface Option {
    idOption: number;
    name: string;
    price: number;
    relatedServices: number[];
}

export interface Service {
    idService: number;
    name: string;
    general: GeneralDataService;
    type: string;
    sim?: Sim;
    hotel?: Hotel;
}

export interface GeneralDataService {
    idService: number;
    idQuote: string;
    price: number;
    currency: string;
    initialDate: Date;
}

export interface Sim {
    simName: string;
    description: string;
    countrySim: string;
}

export interface Hotel {
    hotelName: string;
    initialDate: Date;
    finalDate: Date;
    supplierName: string;
}