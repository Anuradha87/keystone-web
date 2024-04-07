import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  snackbar: {
    backgroundColor: "#FFCDD2 !important",
  },
});

const MessageBox = ({ message, onClose }) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={true}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
      className={classes.snackbar} 
    />
  );
};

export default MessageBox;