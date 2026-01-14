import { useContext } from 'react'
import { MatchesContext } from '../context/MatchesContext'

export const useMatches = () => {
  const context = useContext(MatchesContext)
  return context
}
