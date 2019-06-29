const fs = require('fs');
const path = require('path');
const config = 'gsm_extract.json';

(function gsmExtract(dir, extract = false) {
    console.log(dir);
    if (fs.existsSync(path.join(dir, config))) {
        try {
            var configObj = JSON.parse(fs.readFileSync(config));
        } catch (error) {
            console.error(`${config} not configured propery`)
        }

        for (let [msdir, modules] of Object.entries(configObj)) {
            if (modules == 'all') {
                for (let mdir of fs.readdirSync(path.join(dir, msdir))) {
                    gsmExtract(path.join(dir, msdir, mdir), true);
                }
            }
        }
    }

    if (extract) {
        for (let file of fs.readdirSync(dir)) {
            if (file != '.git') {
                if (process.argv[2] == 'soft') {
                    fs.copyFileSync(path.join(dir, file), path.join(dir, '..', file));
                } else {
                    fs.renameSync(path.join(dir, file), path.join(dir, '..', file));
                    if (fs.existsSync(path.join(dir, '.git'))) fs.unlinkSync(path.join(dir, '.git'));
                    fs.rmdir(dir, console.log);
                }
            }
        }
    }
})(path.join(__dirname, '..'));