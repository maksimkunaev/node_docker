const path = require('path');
const fs = require('fs');
const isLocal = process.env.ENV_NAME === 'local';

const dataBaseDir = isLocal ? path.join(process.cwd(), './data') : '/etc/todos';
const dataBasePath = path.join(dataBaseDir, 'items.json');

module.exports = async (req, res) => {
    const platform = process.platform;
    const map = {
        darwin: 'macOS',
        linux: 'linux',
        win32: 'windows',
    };
    const osName = map[platform] || platform;
    const logName = process.env.LOG_NAME;

    res.send(
        JSON.stringify({
            osName,
            dataBasePath,
            logName,
        }),
    );
};
