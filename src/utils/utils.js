import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'

export const calcCutList = (cutMembers, stockMember) => {
    const sortCutMembers = cutMembers.slice(0).sort((a,b) => a.length > b.length ? 1 : -1)

    let totalCutMembers = []
    for (let member of sortCutMembers) {
        for (let i = 0; i < member.qty; i++) {
            totalCutMembers.unshift({index: member.index, length: member.length})
        }
    }

    let totalStockMembers = []
    for (let i = 0; i < stockMember.qty; i++) {
        totalStockMembers.push({id: nanoid(), index: stockMember.index, length: stockMember.length, capacity: stockMember.length, cutMembers: []})
    }

    for (let cutMember of totalCutMembers) {
        for (let stockMember of totalStockMembers) {
            if (cutMember.length <= stockMember.capacity) {
                stockMember.cutMembers.push({
                    ...cutMember,
                    id: nanoid()
                })
                stockMember.capacity -= cutMember.length
                break
            }
        }
    }
    return totalStockMembers
}

export const useContainerDimensions = myRef => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight
    })
  
    const [dimensions, setDimensions] = useState({ width: 1, height: 1 })
  
    useEffect(() => {
      const handleResize = () => {
        setDimensions(getDimensions())
      }
  
      if (myRef.current) {
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return dimensions;
};