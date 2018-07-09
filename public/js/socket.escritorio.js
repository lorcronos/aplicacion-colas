// comando para establecer comunicación
var socket = io();

var searchParams = new URLSearchParams(window.location.search); // OJO en IE o EDGE no funciona

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp.numero) {
            label.text(`Ticket ${resp.numero}`);
        } else {
            label.text(resp);
        }

        console.log(resp)

    })
});


// Escuchar
socket.on('connect', function() {

    console.log('Conectado con el servidor.')

});

socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor.')
});