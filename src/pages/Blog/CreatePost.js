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

import { useStore } from '../../Store'

import { CreateNotification } from "../../Component/Notification";
import api from "../../api/api";

function CreatePost() {
    const [open, setOpen] = useState(false);
    const [bodyErr, setBodyErr] = useState(false)
    const [titleErr,setTitleErr] = useState(false)
    const [state,] = useStore()
    const customer = state.customer

    const [post, setPost] = useState({
        author: customer.UserName,
        body: "",
        createdAt: new Date().toISOString(),
        tag: "one",
        title: "",
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        if(customer.UserName === undefined) {
            CreateNotification("error","Please sign in first",'Create Post failed')
            setOpen(false)
        }
        
        if(post.body === "") {setBodyErr(true)} else {setBodyErr(false)}
        if(post.title === "") {setTitleErr(true)} else {setTitleErr(false)}
        if(customer.UserName !== undefined && post.body !== "" && post.title !== ""){
            api
            .post(`/posts`, post)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            }
            )
            setOpen(false)
            CreateNotification("success","Post created successfully",'Create Post Success')
        } 
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
                    error = {titleErr}
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
                    error={bodyErr}
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
