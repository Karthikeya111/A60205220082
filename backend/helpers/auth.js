async function getToken() {
    const authData = await fetch("http://20.244.56.144/train/auth", {
        method: 'POST',
        body: JSON.stringify({
            "companyName": "Amity University",
            "clientID": "95cbf8d7-a09e-48d2-b665-5fa5113c4401",
            "clientSecret": "RViLXLCrSAZCjxTC",
            "ownerName": "Karthikeya Maringanti",
            "ownerEmail": "karthikeyamaringantikarthik@gmail.com",
            "rollNo": "A60205220082"
        })
    })
    const curData = await authData.json()
    return curData;
}

module.exports={getToken}
