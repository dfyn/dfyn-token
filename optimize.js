const fs = require('fs').promises;
const solc = require('solc');

async function process (contractName) {
    const content = await fs.readFile(contractName + '.sol', 'utf-8');
    const sources = {};
    sources[contractName] = {
        content: content,
    };
    const input = {
        language: 'Solidity',
        sources,
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
            optimizer: {
                enabled: true,
                runs: 1000000,
            },
        },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    await fs.writeFile(
        contractName + '.bin',
        output.contracts[contractName][contractName].evm.bytecode.object,
        'utf-8',
    );
}

(async function () {
    const contractNames = [
        'DFYNToken',
    ];

    await Promise.all(contractNames.map(contractName => process(contractName)));
})();
