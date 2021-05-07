const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = '';
const etherscanAPIKey = ''
const mainnetEndpointUrl = 'https://mainnet.infura.io/v3/9b2d9ce8681f477199d092f7e77658c5';

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
