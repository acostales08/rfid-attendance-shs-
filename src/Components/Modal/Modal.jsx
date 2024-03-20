
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ControlledModal = ({
  open,
  onClose,
  title, 
  children,
  maxWidth,
}) => {
  return(
      <>
           <Dialog
              fullWidth
              maxWidth={maxWidth}
              open={open}
              onClose={onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
              {title}
              </DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {children}
              </DialogContentText>
              </DialogContent>

          </Dialog>
      </>
  )
}

export default ControlledModal
