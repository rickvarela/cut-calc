import styles from './StockList.module.css'

export const StockList = ({stockMember, actions}) => {
    return (
        <div className={styles.StockList}>
            <StockHeader />
            <StockTable stockMember={stockMember} actions={actions}/>
        </div>
    )
}

const StockHeader = () => {

    return (
        <div className={styles.StockHeader}>
            <div>Stock Member</div>
        </div>
    )
}

const StockTable = ({stockMember, actions}) => {

    const handelLengthChange = event => {
        actions.updateStockMember({
            ...stockMember,
            length: parseInt(event.target.value)
        })
    }

    const handelQtyChange = event => {
        actions.updateStockMember({
            ...stockMember,
            qty: parseInt(event.target.value)
        })
    }

    return (
        <table className={styles.StockTable}>
            <thead>
                <tr>
                    <th>Length</th>
                    <th>Quanity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type='number' className={styles.StockTableItem} value={stockMember.length} onChange={handelLengthChange} /></td>
                    <td><input type='number' className={styles.StockTableItem} value={stockMember.qty} onChange={handelQtyChange}/></td>
                </tr>
            </tbody>
        </table>
    )
}