import * as React from 'react';
import Button from '@mui/material/Button';

 const ControlledButton = (props) => {

    const {variant, style, size, type, text, color, onClick, icon, fullWidth, disabled} = props
  return (

      <div>
        <Button type={type} variant={variant} style={style} size={size} color={color} disabled={disabled} onClick={onClick} fullWidth={fullWidth}>
          {icon}
          {text}
        </Button>
      </div>

  );
}
export default ControlledButton