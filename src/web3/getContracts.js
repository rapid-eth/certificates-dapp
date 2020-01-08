
import ExampleCoinRinkeby from "../contracts/rinkeby/ExampleCoin.json";

const getContracts = (networkId) => {
    let exampleCoin;

    if (networkId === 4) {
        exampleCoin = ExampleCoinRinkeby
        exampleCoin.address = exampleCoin.networks[4].address
    }

    return { exampleCoin }
}

export default getContracts;
