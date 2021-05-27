const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const publicpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')
const pincode = require('./utils/pincode.js');

app.set('view engine', 'hbs');
app.set("views", viewspath);
hbs.registerPartials(partialpath);

app.use(express.static(publicpath));


app.get("/", (req, res) => {
    res.render('index', {
        data: "Fill The Form To get Vaccination Details"

    });
})
app.get('/pincode', (req, res) => {
    if (!req.query.pincode) {
        return console.log("Please Enter Pincode")
    }

    pincode(req.query.pincode, req.query.date, (err, { name, district, vaccine, minimumage, data,sessions } = {}) => {
        console.log("Gaurav Check it", req.query.pincode, req.query.date);
        console.log(name);

        if (err) {
            return console.log(err);
        }
        let address = [];
        let vaccines=[];
        data.sessions.forEach((element) => {
            address.push(element.address);
            address.push(element.vaccine);
        });

        res.send({ name, district, vaccine, minimumage, address ,vaccines,sessions});
    })
});

app.get('*', (req, res) => {
    res.render('404', { data: "No Data Available" })
})
app.listen(3000, () => {
    console.log("Server started")
})


