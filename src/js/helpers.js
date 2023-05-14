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

export const fetchSheetData = async function(url) {
    try {
        const fetchRequest = fetch(url);
        const response = await Promise.race([
            fetchRequest,
            timeout(TIMEOUT_SEC)
        ]);
        const dataText = await response.text();
        const dataJSON = JSON.parse(dataText.match(/(?<=.*\().*(?=\);)/s));
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        return parseObject(dataJSON);
    } catch(err) {
        throw err;
    }
}

/**
 * Parser for converting raw JSON into readable Object
 *
 * @param {Object} data
 * @return {Array} dataObjectsArray
 */
function parseObject(data) {
    let cellData, propName, dataObject;
    const finalData = { links: [], socials: [], bio: {} };
    const cols = data.table.cols;
    const rows = data.table.rows;
    const propNames = convertPropNames(cols);

    for (let i = 0; i < rows.length; i++) {
        dataObject = {};

        for (let j = 0; j < propNames.length; j++) {
            propName = propNames[j];
            cellData = rows[i]["c"][j];
            if (cellData === null || cellData["v"] == "null") {
                // pass
            } else if (typeof cellData["v"] == "string" && cellData["v"].startsWith("Date")) {
                // dataObject[propName] = new Date(cellData["f"]);
                dataObject[propName] = cellData["f"];
            } else {
                dataObject[propName] = cellData["v"];
            }
        }

        if (dataObject.linkType == "link") {
            finalData.links.push(dataObject);
        } else if (dataObject.linkType == "social") {
            finalData.socials.push(dataObject);
        } else {
            finalData.bio = dataObject;
        }

    }

    return finalData;
}

/**
 * Converts property names into valid object keys
 *
 * @param {Array} props
 * @return {Array} propsArray
 */
function convertPropNames(props) {
    let propsArray = [];
    let prop, propPieces;

    for (let i = 0; i < props.length; i++) {
        prop = props[i].label;

        if (prop.includes(" ") || prop.includes("-")) {
            prop = props[i].label.toLowerCase();
            propPieces = prop.split(/[- ]+/);

            propPieces = propPieces.map((prop, i) => {
                return (i > 0) ? prop.charAt(0).toUpperCase() + prop.slice(1) : prop;
            });

            propsArray.push(propPieces.join(''));
        } else if (Boolean(prop.match(/\b([A-Z])/))) {
            propsArray.push(prop.toLowerCase());
        } else {
            propsArray.push(prop);
        }
    }

    return propsArray;
}
