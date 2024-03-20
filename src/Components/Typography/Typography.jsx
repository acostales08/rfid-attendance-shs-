import React from "react";
import { Typography } from "@mui/material";


const ControlledTypography = (props) => {
    const { variant, display, isGutterBottom = false, text, style } = props

    return (
        <>
            <Typography
            variant = {variant}
            display = {display}
            gutterBottom = {isGutterBottom}
            style= {style}
            >
            {text}
            </Typography>
        </>
    )
}
export default ControlledTypography