const functions = require("firebase-functions");
const Moralis = require("moralis").default;
import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

// THIS FUNCTION IS OUTSIDE OF THE CLOUD FUNCTION RN BECAUSE I WAS TESTING/CONFIGURING
// EXAMPLE BELOW IN COMMENTS

try {
    const chain = EvmChain.GOERLI;

    const address = '0xA8F09F7b38d9488c2dc0cE80aA9Cb18F81AF19eb';

    await Moralis.start({
        apiKey: 'Tz1737VrFic6WiwMRyfSGNqU08BU9uZCZZknmHfCGdG1hdb4sgfBD6X5t99yXnl5',
        // ...and any other configuration
    });

    const response = await Moralis.EvmApi.nft.getNFTOwners({
        address,
        chain,
    });


    // added CORS headrs for permissions during testing
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET");
    response.set("Access-Control-Allow-Headers", "Content-Type");

    console.log(response?.result);
} catch (e) {
    console.error(e);
}
        


// getPrice is cloud function
// Takes request provides response
// THIS IS ONLY ~NAMED~ GET PRICE BUT ITS REALLY GETTING THE NFT OWNERS
// NEED TO CHANGE THIS BEFORE DEPLOY


// CLOUD FUNCTION HERE -> NEED TO PLACE ABOVE API INTO THIS ONE TO CONNECT TO CLOUD
// THIS IS THE FORMAT THO, WE WOULD JUST NEED TO CREATE MULTIPLE CLOUD FUNCTIONS FOR DIFF APIS


// exports.getPrice = functions.https.onRequest(async (req, response) => {

//     // insert API key here
//     await Moralis.start(
//         {
//             apiKey: "Tz1737VrFic6WiwMRyfSGNqU08BU9uZCZZknmHfCGdG1hdb4sgfBD6X5t99yXnl5"
//         }
//     );

//     // QUERY contract address
//     const address = req.query.address;

//     // MORALIS API CALL
//     // We are querying for nft holders of the query
//     const response = await Moralis.EvmApi.nft.getNFTOwners({
//         // params for request
//         address: address,

//         // CHAIN = ETH/GOERLI
//         chain: EvmChain.GOERLI
//     });

//     // map response
//     const walletAddresses = response.result.map(holder => holder.owner_of);

//     // respond with data
//     response.set("Access-Control-Allow-Origin", "*");
//     response.set("Access-Control-Allow-Methods", "GET");
//     response.set("Access-Control-Allow-Headers", "Content-Type");

//     response.json({walletAddresses});

// });