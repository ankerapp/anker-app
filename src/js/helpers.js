import { TIMEOUT_SEC } from './config.js';

const timeout = function(seconds) {
    return new Promise(function(_, reject) {
        setTimeout(() => {
            reject(`Request took too long! Timeout after ${seconds} seconds.`);
        }, seconds * 1000);
    });
}

export const AJAX = async function(url) {
    try {
        const fetchRequest = fetch(url);
        const response = await Promise.race([
            fetchRequest,
            timeout(TIMEOUT_SEC)
        ]);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        return data;
    } catch(err) {
        throw err;
    }
}
