import React from 'react'
import {Card,Typography,CardContent} from '@material-ui/core';


function InfoBox({title , cases,total}) {
   
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBoxTitle" color = "textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBoxCases">{cases}</h2>
                <Typography className="infoBoxTotal" color = "textSecondary">
                    {total} Total
                </Typography>
            </CardContent>  
        </Card>
    )
}

export default InfoBox
