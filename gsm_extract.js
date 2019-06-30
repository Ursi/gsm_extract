const fs = require('fs');
const path = require('path');
const config = 'gsm_extract.json';

const filterFiles = [
    '.git',
    'README.md',
]

function del(path) {
    if (process.argv[2] == '-h' && fs.existsSync(path)) fs.unlinkSync(path);
}

(function gsmExtract(dir, extract = false) {
    console.log(dir);
    if (fs.existsSync(path.join(dir, config))) {
        try {
            var configObj = JSON.parse(fs.readFileSync(path.join(dir, config)));
        } catch (error) {
            console.error(`${config} not configured propery`);
            process.exit();
        }

        for (let [msdir, modules] of Object.entries(configObj)) {
            if (modules == 'all') {
                for (let mdir of fs.readdirSync(path.join(dir, msdir))) {
                    let mpath = path.join(dir, msdir, mdir);
                    if (fs.statSync(mpath).isDirectory()) {
                        gsmExtract(mpath, true);
                    }
                }
            }
        }

        del(path.join(dir, '.gitmodules'));
        del(path.join(dir, config));
    }

    if (extract) {
        for (let file of fs.readdirSync(dir)) {
            if (!filterFiles.includes(file)) {
                if (process.argv[2] == '-h') {
                    fs.renameSync(path.join(dir, file), path.join(dir, '..', file));
                    for (let file of filterFiles) del(path.join(dir, file));
                    fs.rmdir(dir, console.log);
                } else {
                    fs.copyFileSync(path.join(dir, file), path.join(dir, '..', file));
                }
            }
        }
    }
})(path.join(__dirname, '..'));