import styles from './MemberList.module.css'

export const MemberList = ({ cutMembers, actions }) => {
    return (
        <div className={styles.MemberList}>
            <MemberHeader actions={actions}/>
            <MemberTable cutMembers={cutMembers} actions={actions}/>
        </div>
    )
}

const MemberHeader = ({actions}) => {
    return (
        <div className={styles.MemberHeader}>
            <div>Members To Be Cut</div>
            <button onClick={actions.addCutMember}>ADD ROW</button>
        </div>
    )
}

const MemberTable = ({ cutMembers, actions }) => {
    return (
        <table className={styles.MemberTable}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Length</th>
                    <th>Quanity</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cutMembers.map((cutMember, index) => 
                    <MemberRow cutMember={cutMember} actions={actions} index={index + 1} key={cutMember.id}/>
                )}
            </tbody>
        </table>
    )
}

const MemberRow = ({cutMember, actions, index}) => {

    const handelLengthChange = event => {
        actions.updateCutMembers({
            ...cutMember,
            length: parseInt(event.target.value)
        })
    }

    const handelQtyChange = event => {
        actions.updateCutMembers({
            ...cutMember,
            qty: parseInt(event.target.value)
        })
    }

    const handelRemoveCutMember = () => {
        actions.removeCutMember(cutMember)
    }

    return (
        <tr>
            <td className={styles.MemberTableID}>{index}</td>
            <td><input type='number' step='any' className={styles.MemberTableItem} value={cutMember.length} onChange={handelLengthChange} /></td>
            <td><input type='number' step='any' className={styles.MemberTableItem} value={cutMember.qty} onChange={handelQtyChange}/></td>
            <td className={styles.MemberTableDelete}><button className={styles.MemberTableItem} onClick={handelRemoveCutMember}>DELETE</button></td>
        </tr>
    )
}