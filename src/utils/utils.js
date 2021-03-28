import { nanoid } from 'nanoid'

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