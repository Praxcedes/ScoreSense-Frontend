import { useContext } from 'react'
import { PointsContext } from '../context/PointsContext'

export const usePoints = () => useContext(PointsContext)