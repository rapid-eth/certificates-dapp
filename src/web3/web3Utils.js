import {ethers} from 'ethers';


export const decodeLogs = (logs, contractEventsInterface) => {
    let result = []
    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        let cleaned = {};
        let decoded = contractEventsInterface.decode(
            log.data,
            log.topics
        );
        contractEventsInterface.inputs.forEach((input, i) => {
            if (input.type.startsWith("uint")) {
                let x = decoded[input.name];
                cleaned[input.name] = x.toString();
            } else {
                cleaned[input.name] = decoded[input.name];
            }
        });
        log.decoded = cleaned;
        result.push(decoded)
    }
    return result
}

export const arrayify = ethers.utils.arrayify