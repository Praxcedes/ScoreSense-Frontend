import * as ethers from 'ethers'
const COINCLASH_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tournamentId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'choice',
        type: 'uint256'
      }
    ],
    name: 'PlayerJoined',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tournamentId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'round',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'enum CoinClashTournament.RoundResult',
        name: 'result',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'survivors',
        type: 'uint256'
      }
    ],
    name: 'RoundCompleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tournamentId',
        type: 'uint256'
      }
    ],
    name: 'TournamentCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tournamentId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'winner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prizeAmount',
        type: 'uint256'
      }
    ],
    name: 'TournamentCompleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tournamentId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'enum CoinClashTournament.TournamentTier',
        name: 'tier',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'entryFee',
        type: 'uint256'
      }
    ],
    name: 'TournamentCreated',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tournamentId',
        type: 'uint256'
      }
    ],
    name: 'cancelTournament',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'enum CoinClashTournament.TournamentTier',
        name: '_tier',
        type: 'uint8'
      }
    ],
    name: 'createTournament',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tournamentId',
        type: 'uint256'
      }
    ],
    name: 'getActivePlayers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getContractBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tournamentId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_player',
        type: 'address'
      }
    ],
    name: 'getPlayerStatus',
    outputs: [
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'choice',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'paid',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tournamentId',
        type: 'uint256'
      }
    ],
    name: 'getTournament',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'tier',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'entryFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'prizePool',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'state',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'currentRound',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'playersJoined',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'maxPlayers',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lastResult',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'winner',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tournamentId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_choice',
        type: 'uint256'
      }
    ],
    name: 'joinTournament',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'platformFeePercent',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'requiredPlayers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tournamentId',
        type: 'uint256'
      }
    ],
    name: 'resolveRound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tournamentId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_choice',
        type: 'uint256'
      }
    ],
    name: 'submitChoice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'enum CoinClashTournament.TournamentTier',
        name: '',
        type: 'uint8'
      }
    ],
    name: 'tierEntryFees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'tournamentCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'tournaments',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        internalType: 'enum CoinClashTournament.TournamentTier',
        name: 'tier',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'entryFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'prizePool',
        type: 'uint256'
      },
      {
        internalType: 'enum CoinClashTournament.GameState',
        name: 'state',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'currentRound',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'maxPlayers',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'playersJoined',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256'
      },
      {
        internalType: 'enum CoinClashTournament.RoundResult',
        name: 'lastResult',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'winner',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newFeePercent',
        type: 'uint256'
      }
    ],
    name: 'updatePlatformFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newRequiredPlayers',
        type: 'uint256'
      }
    ],
    name: 'updateRequiredPlayers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdrawFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]

const CELO_SEPOLIA_CHAIN_ID = 11142220
const CELO_SEPOLIA_CHAIN_HEX = '0xaa044c'
const CELO_SEPOLIA_RPC_URL = 'https://forno.celo-sepolia.celo-testnet.org'
const CELO_SEPOLIA_EXPLORER = 'https://celo-sepolia.blockscout.com/'
const CELO_CURRENCY = { name: 'CELO', symbol: 'CELO', decimals: 18 }

const COINCLASH_ADDRESS = import.meta.env.VITE_COINCLASH_ADDRESS
  || '0xc2505CFcFFe6afC3B3B732236FF72BE8EA708320'
const POINTS_ADDRESS = import.meta.env.VITE_POINTS_ADDRESS
  || '0x7165F45f6A1733a560d583316ee8e85E74D27758'

const POINTS_TOKEN_ID = 1

const POINTS_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' }
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' }
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const getBrowserProvider = () => {
  if (ethers.BrowserProvider) {
    return new ethers.BrowserProvider(window.ethereum)
  }
  return new ethers.providers.Web3Provider(window.ethereum)
}

const getRpcProvider = () => {
  if (ethers.JsonRpcProvider) {
    return new ethers.JsonRpcProvider(CELO_SEPOLIA_RPC_URL)
  }
  return new ethers.providers.JsonRpcProvider(CELO_SEPOLIA_RPC_URL)
}

export const getReadProvider = () => getRpcProvider()

export const getProvider = () => getBrowserProvider()

export const getCoinClashContract = (signerOrProvider) => (
  new ethers.Contract(COINCLASH_ADDRESS, COINCLASH_ABI, signerOrProvider)
)

export const getPointsContract = (signerOrProvider) => (
  new ethers.Contract(POINTS_ADDRESS, POINTS_ABI, signerOrProvider)
)

export const ensureCeloSepolia = async () => {
  if (!window?.ethereum) {
    throw new Error('Wallet not found. Please install MetaMask or Celo Wallet.')
  }

  const currentChainId = await window.ethereum.request({ method: 'eth_chainId' })
  if (currentChainId === CELO_SEPOLIA_CHAIN_HEX) {
    return
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CELO_SEPOLIA_CHAIN_HEX }]
    })
  } catch (error) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: CELO_SEPOLIA_CHAIN_HEX,
          chainName: 'Celo Sepolia',
          nativeCurrency: CELO_CURRENCY,
          rpcUrls: [CELO_SEPOLIA_RPC_URL],
          blockExplorerUrls: [CELO_SEPOLIA_EXPLORER]
        }]
      })
      return
    }
    throw error
  }
}

export const getCoinClashReadContract = () => {
  const provider = getReadProvider()
  return getCoinClashContract(provider)
}

export const getPointsReadContract = () => {
  const provider = getReadProvider()
  return getPointsContract(provider)
}

export const getChainId = () => CELO_SEPOLIA_CHAIN_ID

export const getContractCode = async () => {
  const provider = getReadProvider()
  return provider.getCode(COINCLASH_ADDRESS)
}

export const getPointsTokenId = () => POINTS_TOKEN_ID
export const getCoinClashAddress = () => COINCLASH_ADDRESS
