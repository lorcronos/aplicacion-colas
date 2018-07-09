const fs = require('fs');

// Clase para los tickets
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

// Clase de gestion de tickets
class TicketControl {

    constructor() {
        // Inicio de datos
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        // Recuperamos los datos guardados
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            // En caso de reinicio del sistema en el mismo día
            // recuperamos el estado de los datos
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            // Como es un día diferente iniciamos los datos
            this.reiniciarConteo();
        }

    }

    siguiente() {
        this.ultimo += 1; // Aumentamos el número del último ticket

        let ticket = new Ticket(this.ultimo, null); // Creamos el ticket
        this.tickets.push(ticket); // Lo añadimos a la cola de tickets

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimo() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets.'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        /* console.log(this.ultimos4);
        return; */
        this.ultimos4.unshift(atenderTicket); // Colocamos el ticket el primero de la lista

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // Borramos el último elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema.');

        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}

// Exportamos para poder usar la clase
module.exports = {
    TicketControl
}