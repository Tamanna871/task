const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importing CORS for frontend-backend communication

const app = express();
const port = 5000;

let userApiToken = ''; // Variable to store the user's API token

app.use(cors()); // Enable CORS to allow requests from the frontend
app.use(express.json()); // Parse JSON bodies

// Endpoint to receive and store the API token from the frontend
app.post('/set-api-token', (req, res) => {
    const { apiToken } = req.body;

    if (!apiToken) {
        return res.status(400).send('API Token is required');
    }

    userApiToken = apiToken; // Store the API token
    console.log('Received API Token:', userApiToken);
    res.status(200).send('API Token received successfully');
});

// Webhook handler to receive form data from forms.app
app.post('/webhook', async (req, res) => {
    try {
        console.log('Received Webhook Data:', JSON.stringify(req.body, null, 2));

        if (!req.body.answer || !req.body.answer.answers) {
            console.error('Answers not found in the webhook data.');
            return res.status(400).send('Invalid webhook data: answers missing.');
        }

        const { questions } = req.body.form;
        const answers = req.body.answer.answers;

        // Find question IDs for "Form Name" and "Form Active"
        const formNameQuestion = questions.find(q => q.question === "Form Name");
        const formActiveQuestion = questions.find(q => q.question === "Form Active");

        if (!formNameQuestion || !formActiveQuestion) {
            console.error('Form Name or Form Active question not found.');
            return res.status(400).send('Form Name or Form Active question is missing.');
        }

        const formNameQuestionId = formNameQuestion._id;
        const formActiveQuestionId = formActiveQuestion._id;

        // Extract the form name and form active status using dynamic question IDs
        const formNameAnswer = answers.find(a => a.q === formNameQuestionId);
        const formActiveAnswer = answers.find(a => a.q === formActiveQuestionId);

        const formName = formNameAnswer?.t; // Extracting form name
        const isActive = formActiveAnswer?.c?.[0]?.t === 'Yes'; // Extracting form active status (Yes/No)

        console.log('Form Name:', formName);
        console.log('Form Active Answer:', isActive);


        if (!isActive) {
            console.log('Form is not active, skipping creation.');
            return res.status(400).send('Form is not active.');
        }

        // Check if API token is set
        if (!userApiToken) {
            return res.status(400).send('API Token not set.');
        }

        try {
            // Sending request to 123FormBuilder API to create the form
            const response = await axios.post('https://api.123formbuilder.com/v2/forms', {
                name: formName,
                active: isActive
            }, {
                headers: {
                    'Authorization': `Bearer ${userApiToken}`
                }
            });

            console.log('Form created on 123FormBuilder:', response.data);
            res.status(200).send('Form created successfully on 123FormBuilder');
        } catch (apiError) {
            if (apiError.response && apiError.response.status === 401) {
                console.error('Invalid or expired API token.');
                res.status(401).send('Invalid API token. Please provide a valid one.');
            } else {
                console.error('Error creating form on 123FormBuilder:', apiError.response?.data || apiError.message);
                res.status(500).send('Error creating form on 123FormBuilder');
            }
        }
    } catch (error) {
        console.error('Error processing webhook request:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server on port 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


