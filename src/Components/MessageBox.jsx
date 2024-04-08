import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MessageBox = ({ message, onClose }) => {

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
      sx={{ backgroundColor: "#FFCDD2 !important" }}
    />
  );
};

export default MessageBox;