require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.post(URI, async (req, res) => {
    const text = req.body.message.text;
    const chatID = req.body.message.chat.id;

    console.log(text);
    // Private chats check
    if (text == "Hello" || text == "HEY") {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatID,
            text: "Heey, Look at me, Im Mr.Meeseeks, Welcome to the club"

        });
    } else {
        return res.send();
    }

});

app.listen(process.env.PORT || 5000, async () => {
    console.log('app running on port', process.env.PORT || 5000);
    await init();
});