const express = require("express");
const router = express.Router();

const { getToken } = require('../helpers/auth');

function filterAndSortTrains(trainData) {
    const CT = new Date();
    const allowedTimeWindowInMinutes = 30;
    const Hours = new Date(CT.getTime() + 12 * 60 * 60 * 1000);
    const change = [];

    for (const train of trainData) {
        const departureTime = new Date();
        departureTime.setHours(train.departureTime.Hours);
        departureTime.setMinutes(train.departureTime.Minutes + train.delayedBy);
        departureTime.setSeconds(train.departureTime.Seconds);

        if (departureTime >= CT && departureTime <= Hours) {
            const availableSeats = train.seatsAvailable.sleeper + train.seatsAvailable.AC;
            const ticketPrices = train.price;

            change.push({
                trainName: train.trainName,
                trainNumber: train.trainNumber,
                departureTime: departureTime,
                seatsAvailable: availableSeats,
                price: ticketPrices,
            });
        }
    }

    change.sort((a, b) => {
        const A = a.price.sleeper + a.price.AC;
        const priceB = b.price.sleeper + b.price.AC;
        if (A !== priceB) return A - priceB;

        const seatsA = a.seatsAvailable;
        const seatsB = b.seatsAvailable;
        const totalSeatsA = seatsA.sleeper + seatsA.AC;
        const totalSeatsB = seatsB.sleeper + seatsB.AC;
        if (totalSeatsA !== totalSeatsB) return totalSeatsB - totalSeatsA;

        return b.departureTime - a.departureTime;
    });

    return change;
}

router.get("/trains", async function (req, res) {
    try {
        const tokenData = await getToken();
        const responseData = await fetch("http://20.244.56.144/train/trains", {
            method: 'GET',
            headers: { Authorization: `Bearer ${tokenData.access_token}` }
        });
        const trainData = await responseData.json();
        const sortedTrains = filterAndSortTrains(trainData);
        res.send({ data: sortedTrains });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: "Error", success: false });
    }
});

module.exports = router;
