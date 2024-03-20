import React from "react";
import { Card } from "@mui/material";

const ControlledCard = (props) => {
    
    const {children, className, style} = props

    return (
        <>
        <Card className={className} style={style}>
            {children}            
        </Card>
        </>
    )
}

export default ControlledCard