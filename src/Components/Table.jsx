import React from 'react'
import styles from '../Styling/Table.module.css'
import numeral from 'numeral'

function Table({country}) {
    return (
        <div className={styles.table} >
            {country.map(({name,cases}) => (
                <div key={name} className={styles.tableData}>
                    <div>
                        {name}
                    </div>
                    <div>
                        <strong>{numeral(cases).format(",")}</strong>
                    </div> 
                   
                </div>
            ))}
            
        </div>
    )
}

export default Table
