
import ExampleCoinRinkeby from "../contracts/rinkeby/ExampleCoin.json";
import LockboxRinkeby from "../contracts/rinkeby/TokenLockbox.json";

const getContracts = (networkId) => {
    let exampleCoin;
    let lockbox;
    if (networkId === 4) {
        exampleCoin = ExampleCoinRinkeby
        exampleCoin.address = exampleCoin.networks[4].address
        lockbox = LockboxRinkeby
        lockbox.address = lockbox.networks[4].address

    }

    return { exampleCoin, lockbox }
}

export default getContracts;
