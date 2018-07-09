const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);

        callback(siguiente);

        /* if (mensaje.usuario) {
            callback('TODO SALIO BIEN!');
        } else {
            callback('TODO SALIO MAL!!!!!!!!!');
        } */

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario.'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    })
});