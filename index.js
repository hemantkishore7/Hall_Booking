const express = require("express");
const app = express();

app.use(express.json());

//create room
const rooms = [
  {
    name: "elite",
    seats: 100,
    amenities: "A/C, Free Wi-Fi",
    price_1hr: 1999,
    room_id: 10019991,
    bookingDetail: [
      {
        cus_name: "Srinivas",
        date: "04/05/2023",
        start: "12:00",
        end: "9:00",
        status: "comfirmed",
      },
    ],
  },
  {
    name: "premium",
    seats: 200,
    amenities: "A/C, Free Wi-Fi, Projection Screen",
    price_1hr: 3999,
    room_id: 20039992,
    bookingDetail: [
      {
        cus_name: "Aravind",
        date: "06/05/2023",
        start: "8:00",
        end: "17:00",
        status: "payment pending",
      },
    ],
  },
];

//Common Api call
app.use("/", (req, res, next) => {
  res.status(200).send("Server Running Succesfully!");
});

//create room
app.post("/create", (req, res) => {
  rooms.push({
    name: req.body.name,
    seats: req.body.seats,
    amenities: req.body.amenities,
    price_1hr: req.body.price_1hr,
    room_id: `${req.body.seats}${req.body.price_1hr}${rooms.length + 1}`,
    bookingDetail: [{}],
  });
  res.send(rooms);
});

//Booking a room with customer_name, date, start, end & status
app.post("/book", (req, res) => {
  for (let i = 0; i <= rooms.length; i++) {
    if (!(rooms[i].room_id == req.body.room_id)) {
      return res.status(400).send("Room Not Available!");
    } else {
      let Booking = {
        cus_name: req.body.cus_name,
        date: new Date(req.body.date),
        start: req.body.start,
        end: req.body.end,
        status: req.body.status,
      };
      let result = undefined;
      rooms[i].bookingDetail.forEach((book)=>{
        if(book.date.getTime()==Booking.date.getTime() && book.start === Booking.start){
           // return res.status(400).send('Rooms not available on that time')
           console.log("booking")
        }
      })
    }
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is working on Port ${port}`);
});
