// comando para establecer comunicación
var socket = io();

var label = $('#lblNuevoTicket');

// Escuchar
socket.on('connect', function() {

    console.log('Conectado con el servidor.')

});

socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor.')
});

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

$('button').on('click', function() {
    console.log('click');


    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });




});