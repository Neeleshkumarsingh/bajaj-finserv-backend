const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Allow only the specific frontend origin
app.use(cors({
    origin: 'https://bajaj-finserv-frontend-sable.vercel.app/',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
    credentials:true,
    optionSuccessStatus:200
}));

app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});
app.options('/bfhl', cors()); // Enable pre-flight requests for /bfhl

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!data || !Array.isArray(data)) {
            throw new Error("Invalid input: 'data' should be an array.");
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const lowerCaseAlphabets = alphabets.filter(item => item === item.toLowerCase());

        const highestLowercase = lowerCaseAlphabets.length > 0 ? [lowerCaseAlphabets.sort().pop()] : [];

        const response = {
            "is_success": true,
            "user_id": "Neelesh_Kumar_Singh_11042003",
            "email": "neeleshkumar.singh2021@vitstudent.ac.in",
            "roll_number": "21BEC0187",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highestLowercase
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({ "is_success": false, "error": error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
