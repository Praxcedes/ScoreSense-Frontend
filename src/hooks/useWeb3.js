import { useCallback, useEffect, useState } from 'react'
import walletService from '../services/walletService'
import {
  ensureCeloSepolia,
  getChainId,
  getCoinClashContract,
  getCoinClashReadContract,
  getPointsContract,
  getPointsReadContract,
  getProvider
} from '../services/blockchain'

export const useWeb3 = () => {
  const [address, setAddress] = useState('')
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [readContract, setReadContract] = useState(null)
  const [pointsContract, setPointsContract] = useState(null)
  const [pointsReadContract, setPointsReadContract] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [connecting, setConnecting] = useState(false)

  const syncProvider = useCallback(async () => {
    if (!window?.ethereum) {
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (!accounts.length) {
      setAddress('')
      setProvider(null)
      setContract(null)
      return
    }

    const web3Provider = getProvider()
    const network = await web3Provider.getNetwork()
    const signer = await web3Provider.getSigner()
    const signerAddress = await signer.getAddress()

    setAddress(signerAddress)
    setProvider(web3Provider)
    setContract(getCoinClashContract(signer))
    setPointsContract(getPointsContract(signer))
    const normalizedChainId = typeof network.chainId === 'bigint'
      ? Number(network.chainId)
      : network.chainId
    setChainId(normalizedChainId)
  }, [])

  useEffect(() => {
    setReadContract(getCoinClashReadContract())
    setPointsReadContract(getPointsReadContract())
    syncProvider()

    if (!window?.ethereum) {
      return
    }

    const handleAccountsChanged = () => {
      syncProvider()
    }

    const handleChainChanged = () => {
      syncProvider()
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [syncProvider])

  const connectWallet = useCallback(async () => {
    setConnecting(true)
    try {
      const result = await walletService.connectWallet()
      if (!result.success) {
        throw new Error(result.error || 'Failed to connect wallet')
      }
      await ensureCeloSepolia()
      await syncProvider()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setConnecting(false)
    }
  }, [syncProvider])

  const ensureNetwork = useCallback(async () => {
    await ensureCeloSepolia()
    await syncProvider()
  }, [syncProvider])

  const isCorrectNetwork = chainId === getChainId()

  return {
    address,
    provider,
    contract,
    readContract,
    pointsContract,
    pointsReadContract,
    chainId,
    connecting,
    isCorrectNetwork,
    connectWallet,
    ensureNetwork
  }
}
