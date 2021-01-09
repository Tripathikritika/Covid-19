import React from 'react'
import styles from '../Styling/Table.module.css'

function Table({country}) {
    return (
        <div className={styles.table} >
            {country.map(({name,cases}) => (
                <div key={name} className={styles.tableData}>
                    <div>
                        {name}
                    </div>
                    <div>
                        {cases}
                    </div>
                   
                </div>
            ))}
            
        </div>
    )
}

export default Table
