import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { useStore,actions } from '../../Store'

import { CreateNotification } from "../../Component/Notification";

function CreatePost() {
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useStore()
    const customer = state.customer

    const [post, setPost] = useState({
        body: "",
        cover: "https://picsum.photos/seed/19787/1920/270",
        id: 101,
        isDraft: false,
        tag: "",
        createdAt: new Date().toISOString(),
        title: "",
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        if(customer.status === "active") {
            dispatch(actions.addPost(post))
        } else {
            CreateNotification("error","Please sign in first",'Create Post failed')
        }
        setOpen(false);
    }

    return (
        <React.Fragment>
        <Button
            className="createPost"
            variant="outlined"
            onClick={handleClickOpen}
        >
            Create post
        </Button>
        <Dialog className="createDialog" open={open} onClose={handleClose}>
            <DialogTitle>Create your own post now!</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please fill in the form below to create your own post.
                <div className="inputHeader">
                <TextField
                    id="outlined-basic"
                    name="title"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    label="Title"
                    variant="outlined"
                    className="inputTitle"
                />
                <FormControl className="inputTag" >
                    <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={post.tag}
                        label="Age"
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    >
                        {['one','two','three'].map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            {tag}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </div>
                <TextField
                    id="outlined-basic"
                    name="body"
                    value={post.body}
                    onChange={(e) => setPost({ ...post, body: e.target.value })}
                    label="Body"
                    variant="outlined"
                    className="inputBody"
                    multiline
                    rows={8}
                />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

export default CreatePost;
