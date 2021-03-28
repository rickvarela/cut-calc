import { useState } from 'react'
import { calcCutList } from '../utils/utils'

import styles from './CutList.module.css'

export const CutList = ({cutMembers, stockMember}) => {
    const [cutState, setCutState] = useState([])

    const handelRunCutList = () => {
        setCutState(calcCutList(cutMembers, stockMember))
    }

    return (
        <div className={styles.CutList}>
            <CutListHeader runCutList={handelRunCutList}/>
            <CutListDisplay cutState={cutState} key='cut-list-display'/>
        </div> 
    )
}

const CutListHeader = ({runCutList}) => {
    return (
        <div className={styles.CutListHeader}>
            <div>Cut List</div>
            <button onClick={runCutList}>CALC</button>
        </div>
    )
}

const CutListDisplay = ({cutState}) => {

    const DISPLAY_PROPS = {
        STOCK_HEIGHT: 5,
        GAP_HEIGHT: 2,
        X: 5,
        Y: 5
    } 

    return (
        <div className={styles.CutListDisplay}>
            <svg width='100%' viewBox={`0 0 100 ${DISPLAY_PROPS.Y + cutState.length * (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT)}`} preserveAspectRatio='none'>
            {cutState.map((stockMember, index) => 
                <CutListMember stockMember={stockMember} key={stockMember.id} index={index} DISPLAY_PROPS={DISPLAY_PROPS} />
            )}
            </svg>
        </div>
    )
}

const CutListMember = ({stockMember, index, DISPLAY_PROPS}) => {



    const scaleFactor = 90.0 / stockMember.length
    console.log(scaleFactor)
    
    let xCord = DISPLAY_PROPS.X
    let membersDisplayList = []
    console.log(stockMember)
    for (let cutMember of stockMember.cutMembers) {
        membersDisplayList.push(
            <g key={cutMember.id}>
                {(cutMember.length * scaleFactor) > 3 && <text x={xCord + 0.5} y={DISPLAY_PROPS.Y + 4.5 + (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT) * index} fontSize="0.125rem">#{cutMember.index}</text>}
                <rect x={xCord} y={DISPLAY_PROPS.Y + (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT) * index} width={cutMember.length * scaleFactor} height="5" fill='none' stroke='#3891A6' vectorEffect='non-scaling-stroke'/>
            </g>
        )
        xCord += cutMember.length * scaleFactor
    }

    return [
        <rect key={stockMember.id} x="5" y={DISPLAY_PROPS.Y + (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT) * index} width="90" height="5" fill='#E0E1E1' stroke='#CBCDCD' vectorEffect='non-scaling-stroke' />,
        ...membersDisplayList
    ]
}