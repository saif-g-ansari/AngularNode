var express = require('express');
const mysql = require('mysql');
var bodyParser = require("body-parser");
var cors = require('cors');
var config = require('./app/config/config.js');
var app = express();
// var BookingSocket = require('./app/BookingSocket/index');

var server = app.listen(9090, () => {
    console.log("Server is listening on port 9090");
});

// const io = require("socket.io").listen(server);

app.use(bodyParser.json());
app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));

// Connecting to the database
const mc = mysql.createConnection({
    host: config.DB.host,
    user: config.DB.user,
    password: config.DB.password,
    database: config.DB.Localdatabase
});

mc.connect();

app.use(express.static('statics'));

require('./app/routes/routes.js')(app);

//Socket Functionality
// io.on('connection', function (socket) {
//     io.emit('this', { will: 'be received by everyone' });

//     socket.on('BlockSlot', async function (slotid) {
//         console.log(slotid, 'Slot Blocked');

//         if (slotid != 0) {
//             socket.emit('ReceivedStatus', { staus: 'Blocked', slotid: slotid });

//             BookingSocket.ChangeSlotstatus(slotid, 2);

//             setTimeout(async () => {
//                 await BookingSocket.TimeOutSlotStatus(slotid);
//                 socket.emit('ReceivedStatus', { staus: 'Normal', slotid: slotid });
//             }, 5 * 60 * 1000); // 5 * 60 * 1000 // 5 Minutes

//         } else {
//             socket.emit('ReceivedStatus', { staus: 'something went wrong! Please try again', slotid: 0 });
//         }
//     });

//     socket.on('CancelBooking', function (slotid) {
//         console.log(slotid, 'Booking Canceled');

//         if (slotid != 0) {
//             socket.emit('ReceivedStatus', { staus: 'Normal', slotid: slotid });
//             BookingSocket.ChangeSlotstatus(slotid, 1);
//         }

//     });

//     socket.on('BookSlot', async function (objBookingSlot) {
//         console.log(objBookingSlot.SlotId, 'Slot Booked');
//         socket.emit('ReceivedStatus', { color: 'Booked', slotid: objBookingSlot.SlotId });

//         var BookSlot = await BookingSocket.BookSlot(objBookingSlot);

//         if (BookSlot) {
//             socket.emit('ReceivedBookingStatus', BookSlot);

//             if (BookSlot.Status == 0) {
//                 socket.emit('ReceivedStatus', { color: 'Canceled', slotid: objBookingSlot.SlotId });
//             }

//         }
//     });

//     socket.on('disconnect', function () {
//         io.emit('user disconnected');
//     });
// });