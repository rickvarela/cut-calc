import { useEffect, useRef, useState } from 'react'
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

const useContainerDimensions = myRef => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight
    })
  
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
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

const CutListDisplay = ({cutState}) => {
    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)

    const DISPLAY_PROPS = {
        STOCK_HEIGHT: 5,
        GAP_HEIGHT: 2,
        SCALE_FACTOR: 100 / width,
        X: 5,
        Y: 5
    } 

    return (
        <div className={styles.CutListDisplay} ref={componentRef}>
            <svg width='100%' viewBox={`0 0 100 ${DISPLAY_PROPS.Y + cutState.length * (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT)}`} >
            {cutState.map((stockMember, index) => 
                <CutListMember stockMember={stockMember} key={stockMember.id} index={index} DISPLAY_PROPS={DISPLAY_PROPS} width={width} />
            )}
            </svg>
        </div>
    )
}

const CutListMember = ({stockMember, index, DISPLAY_PROPS, width}) => {

    console.log(width)
    const memberScaleFactor = 90.0 / stockMember.length
    
    let xCord = DISPLAY_PROPS.X
    let membersDisplayList = []

    for (let cutMember of stockMember.cutMembers) {
        membersDisplayList.push(
            <g key={cutMember.id}>
                {(cutMember.length * memberScaleFactor) > 3 && <text x={xCord + 0.5} y={DISPLAY_PROPS.Y + 4.5 + (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT) * index} fontSize={DISPLAY_PROPS.SCALE_FACTOR * 32} >#{cutMember.index}</text>}
                <rect x={xCord} y={DISPLAY_PROPS.Y + (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT) * index} width={cutMember.length * memberScaleFactor} height="5" fill='none' stroke='#3891A6' vectorEffect='non-scaling-stroke'/>
            </g>
        )
        xCord += cutMember.length * memberScaleFactor
    }

    return [
        <rect key={stockMember.id} x="5" y={DISPLAY_PROPS.Y + (DISPLAY_PROPS.STOCK_HEIGHT + DISPLAY_PROPS.GAP_HEIGHT) * index} width="90" height="5" fill='#E0E1E1' stroke='#CBCDCD' vectorEffect='non-scaling-stroke' />,
        ...membersDisplayList
    ]
}