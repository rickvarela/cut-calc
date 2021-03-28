import { useState } from 'react'
import { nanoid } from 'nanoid'

import { CutList } from './components/CutList'
import { MemberList } from './components/MemberList'
import { StockList } from './components/StockList'

import styles from './App.module.css'

const initialData = {
  cutMembers: [
    {
      id: nanoid(),
      index: 1,
      length: 12,
      qty: 3
    },
    {
      id: nanoid(),
      index: 2,
      length: 22,
      qty: 10
    }
  ],
  stockMember: 
    {
      id: nanoid(),
      index: 1,
      length: 90,
      qty: 3
    }
}

function App() {
  const [cutMembers, setCutMembers] = useState(initialData.cutMembers)
  const [stockMember, setStockMember] = useState(initialData.stockMember)

  const handelUpdateCutMembers = newCutMember => {
    const newCutMembers = cutMembers.map(
      cutMember => {
        if(cutMember.id === newCutMember.id) {
          return ({
            ...cutMember,
            ...newCutMember
          })
        } else {
          return {...cutMember}
        }
      }
    )
    setCutMembers(newCutMembers)
  }

  const handelUpdateStockMember = newStockMember => {
    setStockMember(newStockMember)
  }

  const handelAddCutMember = () => {
    setCutMembers([
      ...cutMembers,
      {
        id: nanoid(),
        index: cutMembers.length + 1,
        length: 0,
        qty: 0
      }
    ])
  }

  const handelRemoveCutMember = deleteCutMember => {
    console.log(deleteCutMember)
    let newCutMembers = cutMembers.filter(cutMember => cutMember.id !== deleteCutMember.id)
    newCutMembers = newCutMembers.map((cutMember, index) => {
      return {
        ...cutMember,
        index: index + 1
      }
    })

    setCutMembers(newCutMembers)
  }

  const actions = {
    updateCutMembers: handelUpdateCutMembers,
    updateStockMember: handelUpdateStockMember,
    addCutMember: handelAddCutMember,
    removeCutMember: handelRemoveCutMember
  }

  return (
    <div className={styles.App}>
      <AppHeader />
      <div className={styles.AppMain}>
        <div className={styles.AppMenu}>
          <MemberList cutMembers={cutMembers} actions={actions} />
          <StockList stockMember={stockMember} actions={actions} />
        </div>
        <CutList cutMembers={cutMembers} stockMember={stockMember}/>
      </div>
    </div>
  );
}

const AppHeader = () => {
  return (
    <div className={styles.AppHeader}>
      <h1>CUT CALC</h1>
    </div>
  )
}

export default App;