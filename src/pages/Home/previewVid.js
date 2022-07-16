import React from "react";

import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import previewVideo from "../../Videos/previewVid.mp4";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PreviewVid() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="previewPlayBtn">
      <Button
        style={{ border: "none", color: "#fff" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <PlayArrowIcon style={{ fontSize: "40px" }} />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{background:"rgba(255,255,255,0.2)"}}
          >
          <Toolbar className="toolBar"  onClick={handleClose}>
            <IconButton
              edge="start"
              color="inherit"
             
              aria-label="close"
              style={{margin:"0",padding:"0",textAlign:"center",width:"100%",height:"100%"}}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        <video className="videoPreview" style={{width:"100%",height:"100%",backdropFilter:"blur(10px)"}}  controls autoPlay loop >
          <source src={previewVideo} type="video/mp4" />
        </video>
      </Dialog>
    </div>
  );
}

export default PreviewVid;
