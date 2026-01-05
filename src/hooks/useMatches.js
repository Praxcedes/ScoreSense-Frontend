import { useContext } from 'react'
import { MatchesContext } from '../context/MatchesContext'

export const useMatches = () => useContext(MatchesContext)