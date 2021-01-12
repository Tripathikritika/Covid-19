import React from 'react'
import {Card,Typography,CardContent} from '@material-ui/core';
import styles from '../Styling/InfoBoxes.module.css'

function InfoBox({title , cases,active,isRed,total,...props}) {
   
    return (
        // -- modification
        <Card className={`${styles.infoBox} ${active && styles.infoBoxSelected} ${isRed && styles.infoBoxRed}`} onClick={props.onClick} >
            <CardContent>
                <Typography className="infoBoxTitle" color = "textSecondary">
                    {title}
                </Typography>
                <h2 className={`${styles.infoBoxCases} ${!isRed && styles.infoBoxCasesNotRed}`}>{cases}</h2>
                <Typography className={styles.infoBoxTotal} color = "textSecondary">
                    {total} Total
                </Typography>
            </CardContent>  
        </Card>
    )
}

export default InfoBox
