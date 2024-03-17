const express = require('express');
const cors = require('cors');
const Web3 = require('web3');
const { abi } = require('./abi.js');
const app = express();
app.use(cors()); // allow all CORS
const port = 3000;

const web3 = new Web3.default('https://testnet.galadriel.com'); // replace with your rpc node

const contractAddress = '0xc38Dc0b25E3Ad903C3620E3005765c6c2D95710C'; // replace with your contract address


const contract = new web3.eth.Contract(abi, contractAddress);

app.get('/benchmarkGroups', async (req, res) => {
    try {
        const benchmarkGroups = await contract.methods.getBenchmarkGroups().call();
        const benchmarkGroupsJSON = JSON.stringify(benchmarkGroups, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value // convert bigint to string
        );
        const parsedBenchmarkGroups = JSON.parse(benchmarkGroupsJSON);
        const cleanedBenchmarkGroups = parsedBenchmarkGroups.map(group => {
            const {name, description, results} = group;
            return {
                name,
                description,
                results: {
                    scoreSum: results.scoreSum,
                    runs: results.runs.map(run => {
                        const { prompt, response, score, blockTimestamp } = run;
                        return { prompt, response, score, blockTimestamp };
                    })
                }
            }
        });
        res.json(cleanedBenchmarkGroups);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
