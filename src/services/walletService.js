/**
 * Wallet Service for ScoreSense Frontend
 * Handles MetaMask/Celo wallet connections
 */

class WalletService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.walletAddress = null;
    this.chainId = null;
    this.isConnected = false;
  }

  /**
   * Check if MetaMask/Celo wallet is installed
   */
  async checkWalletInstalled() {
    if (typeof window.ethereum !== 'undefined') {
      return true;
    }
    
    // Check for Celo wallet specifically
    if (typeof window.celo !== 'undefined') {
      return true;
    }
    
    return false;
  }

  /**
   * Connect to wallet
   */
  async connectWallet() {
    try {
      if (!await this.checkWalletInstalled()) {
        throw new Error('No Ethereum wallet found. Please install MetaMask or Celo Wallet.');
      }

      // Request account access
      await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Import ethers dynamically
      const ethersModule = await import('ethers');
      const ethers = ethersModule.default || ethersModule;
      
      // Create ethers provider and signer
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.walletAddress = await this.signer.getAddress();
      
      // Get chain ID
      this.chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      this.isConnected = true;

      // Store in localStorage
      localStorage.setItem('walletAddress', this.walletAddress);
      localStorage.setItem('walletConnected', 'true');

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          this.disconnectWallet();
        } else {
          this.walletAddress = accounts[0];
          localStorage.setItem('walletAddress', this.walletAddress);
          window.dispatchEvent(new Event('walletAccountChanged'));
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        this.chainId = chainId;
        window.location.reload(); // Reload on network change
      });

      return {
        success: true,
        address: this.walletAddress,
        chainId: this.chainId
      };

    } catch (error) {
      console.error('Wallet connection error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Disconnect wallet
   */
  disconnectWallet() {
    this.provider = null;
    this.signer = null;
    this.walletAddress = null;
    this.chainId = null;
    this.isConnected = false;
    
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletConnected');
    
    window.dispatchEvent(new Event('walletDisconnected'));
  }

  /**
   * Get wallet address
   */
  getAddress() {
    return this.walletAddress || localStorage.getItem('walletAddress');
  }

  /**
   * Check if wallet is connected
   */
  getIsConnected() {
    return this.isConnected || localStorage.getItem('walletConnected') === 'true';
  }

  /**
   * Sign a message (for authentication)
   */
  async signMessage(message) {
    if (!this.signer || !this.walletAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await this.signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error('Message signing error:', error);
      throw error;
    }
  }

  /**
   * Get CELO balance
   */
  async getCeloBalance() {
    if (!this.provider || !this.walletAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const balance = await this.provider.getBalance(this.walletAddress);
      // Get ethers from provider
      const ethers = this.provider.provider.ethers || (await import('ethers')).default;
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Balance check error:', error);
      throw error;
    }
  }

  /**
   * Switch to Celo Sepolia network
   */
  async switchToCeloSepolia() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }] // 11142220 in hex
      });
      return true;
    } catch (switchError) {
      // If network not added, add it
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
          });
          return true;
        } catch (addError) {
          throw new Error('Failed to add Celo Sepolia network');
        }
      }
      throw switchError;
    }
  }
}

// Create singleton instance
const walletService = new WalletService();
export default walletService;
