import { Service } from "../models/quote.model";

export const QUOTE_SERVICES_MOCK: Service[] = [
    {
        idService: 1,
        name: 'Sim simple',
        general: {
            idService: 1,
            idQuote: '1',
            price: 100,
            currency: 'EUR',
            initialDate: new Date()
        },
        type: 'SIM',
        sim: {
            simName: 'Sim 1',
            description: 'Sim 1 description',
            countrySim: 'Spain'
        }
    },
    {
        idService: 2,
        name: 'Sim con plan',
        general: {
            idService: 1,
            idQuote: '1',
            price: 100,
            currency: 'EUR',
            initialDate: new Date()
        },
        type: 'SIM',
        sim: {
            simName: 'Sim 2',
            description: 'Sim 2 description',
            countrySim: 'Spain'
        }
    }
]