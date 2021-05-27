const request = require('request');


const getPincodeData = (pincode, date, callback) => {

    const pinCodeurl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + encodeURIComponent(pincode) + "&date=" + encodeURIComponent(date);

    request(pinCodeurl, (err, { body } = {}) => {

        const data = JSON.parse(body);
        console.log(data);
        if (err) {
            return console.log("error: ", err)
        } else if (data.error) {
            return console.log("ERROR", data.error);
        } else {
            const sessions= data.sessions;
            const finalData = data.sessions[1];
            const name = finalData.name;
            const district = finalData.district_name;
            const vaccine = finalData.vaccine;
            const minimumage = finalData.min_age_limit;

            callback(data.error, { name, district, vaccine, minimumage, data ,sessions})

        }

    })
}

module.exports = getPincodeData;