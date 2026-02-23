/**
 * Wallet Service for ScoreSense Frontend
 * Handles MetaMask/Celo wallet connections
 */

class WalletService {
  constructor() {
    this.provider = null
    this.signer = null
    this.walletAddress = null
    this.chainId = null
    this.isConnected = false
  }

  async checkWalletInstalled() {
    if (typeof window.ethereum !== 'undefined') {
      return true
    }

    if (typeof window.celo !== 'undefined') {
      return true
    }

    return false
  }

  async connectWallet() {
    try {
      if (!await this.checkWalletInstalled()) {
        throw new Error('No Ethereum wallet found. Please install MetaMask or Celo Wallet.')
      }

      await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      const ethersModule = await import('ethers')
      const ethers = ethersModule.default || ethersModule

      if (ethers.BrowserProvider) {
        this.provider = new ethers.BrowserProvider(window.ethereum)
        this.signer = await this.provider.getSigner()
      } else {
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        this.signer = this.provider.getSigner()
      }

      this.walletAddress = await this.signer.getAddress()
      this.chainId = await window.ethereum.request({
        method: 'eth_chainId'
      })

      this.isConnected = true

      localStorage.setItem('walletAddress', this.walletAddress)
      localStorage.setItem('walletConnected', 'true')

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          this.disconnectWallet()
        } else {
          this.walletAddress = accounts[0]
          localStorage.setItem('walletAddress', this.walletAddress)
          window.dispatchEvent(new Event('walletAccountChanged'))
        }
      })

      window.ethereum.on('chainChanged', (chainId) => {
        this.chainId = chainId
        window.location.reload()
      })

      return {
        success: true,
        address: this.walletAddress,
        chainId: this.chainId
      }
    } catch (error) {
      console.error('Wallet connection error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  disconnectWallet() {
    this.provider = null
    this.signer = null
    this.walletAddress = null
    this.chainId = null
    this.isConnected = false

    localStorage.removeItem('walletAddress')
    localStorage.removeItem('walletConnected')

    window.dispatchEvent(new Event('walletDisconnected'))
  }

  getAddress() {
    return this.walletAddress || localStorage.getItem('walletAddress')
  }

  getIsConnected() {
    return this.isConnected || localStorage.getItem('walletConnected') === 'true'
  }

  async ensureSigner() {
    if (this.signer && this.walletAddress) {
      return true
    }
    if (!this.getIsConnected()) {
      return false
    }
    if (typeof window.ethereum === 'undefined') {
      return false
    }

    const ethersModule = await import('ethers')
    const ethers = ethersModule.default || ethersModule

    if (ethers.BrowserProvider) {
      this.provider = this.provider || new ethers.BrowserProvider(window.ethereum)
      this.signer = await this.provider.getSigner()
    } else {
      this.provider = this.provider || new ethers.providers.Web3Provider(window.ethereum)
      this.signer = this.provider.getSigner()
    }

    this.walletAddress = this.walletAddress || await this.signer.getAddress()
    return Boolean(this.walletAddress)
  }

  async signMessage(message) {
    const ready = await this.ensureSigner()
    if (!ready) {
      throw new Error('Wallet not connected')
    }

    try {
      const signature = await this.signer.signMessage(message)
      return signature
    } catch (error) {
      console.error('Message signing error:', error)
      throw error
    }
  }

  async getCeloBalance() {
    if (!this.provider || !this.walletAddress) {
      throw new Error('Wallet not connected')
    }

    try {
      const ethersModule = await import('ethers')
      const ethers = ethersModule.default || ethersModule
      const balance = await this.provider.getBalance(this.walletAddress)
      return ethers.formatEther ? ethers.formatEther(balance) : ethers.utils.formatEther(balance)
    } catch (error) {
      console.error('Balance check error:', error)
      throw error
    }
  }

  async switchToCeloSepolia() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }]
      })
      return true
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Celo Sepolia Testnet',
              nativeCurrency: {
                name: 'CELO',
                symbol: 'CELO',
                decimals: 18
              },
              rpcUrls: ['https://forno.celo-sepolia.celo-testnet.org'],
              blockExplorerUrls: ['https://celo-sepolia.blockscout.com/']
            }]
          })
          return true
        } catch (addError) {
          throw new Error('Failed to add Celo Sepolia network')
        }
      }
      throw switchError
    }
  }
}

const walletService = new WalletService()
export default walletService
