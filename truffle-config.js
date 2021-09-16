const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const etherscanAPIKey = process.env.PRIVATE_KEY;
const mainnetEndpointUrl = process.env.MAINNET_ENDPOINT_URL;

module.exports = {
    networks: {
        mainnet: {
            provider: function() {
                return new HDWalletProvider({
                    privateKeys: [privateKey],
                    providerOrUrl: mainnetEndpointUrl,
                    chainId: 1
                });
            },
            gas: 2000000,
            gasPrice: 130000000000,
            network_id: 1,
            skipDryRun: true
        }
    },
    compilers: {
        solc: {
            version: '0.6.12',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 1000000
                }
            }
        }
    },
    api_keys: {
        etherscan: etherscanAPIKey
    },
    plugins: ['truffle-plugin-verify'],
    mocha: { // https://github.com/cgewecke/eth-gas-reporter
        reporter: 'eth-gas-reporter',
        reporterOptions: {
            currency: 'USD',
            gasPrice: 10,
            onlyCalledMethods: true,
            showTimeSpent: true,
            excludeContracts: ['Migrations', 'mocks']
        }
    }
};
