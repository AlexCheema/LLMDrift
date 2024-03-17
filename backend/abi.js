module.exports.abi = [ // replace with your contract abi
    {
        "constant": true,
        "inputs": [],
        "name": "getBenchmarkGroups",
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    { "name": "name", "type": "string" },
                    { "name": "description", "type": "string" },
                    { "name": "benchmarks", "type": "address[]" },
                    { 
                        "name": "results", 
                        "type": "tuple",
                        "components": [
                            {
                                "name": "runs",
                                "type": "tuple[]",
                                "components": [
                                    { "name": "prompt", "type": "string" },
                                    { "name": "response", "type": "string" },
                                    { "name": "score", "type": "uint32" },
                                    { "name": "blockTimestamp", "type": "uint32" }
                                ]
                            },
                            { "name": "scoreSum", "type": "uint64" }
                        ]
                    }
                ]
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
