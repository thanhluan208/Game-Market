import React, { useState, useEffect,useRef } from "react";

import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import { useStore } from '../../Store'

import { CreateNotification } from "../../Component/Notification";

function PostContent({ post }) {
    const [active, setActive] = useState(false);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [report, setReport] = useState(false)
    const [favorite, setFavorite] = useState(false);
    const [likeCount, setLikeCount] = useState(0)
    const [favorCount, setFavorCount] = useState(0)
    const [dislikeCount, setDislikeCount] = useState(0)
    const [firstRender, setFirstRender] = useState(true)

    const initLike = useRef(Math.floor(Math.random() * 100 + 500))
    const initFavor = useRef(Math.floor(Math.random() * 50 + 50))
    const initDislike = useRef(Math.floor(Math.random() * 100 + 100))

    const [{customer, }, ] = useStore();

    useEffect(() => {
        let count = 0
        if (firstRender) {
            var setLike = setTimeout(() => {
                if(initLike.current > likeCount + 10) {
                    setLikeCount(likeCount + Math.floor(Math.random() * 10 + 1))
                } else {
                    setLikeCount(initLike.current)
                }
            }, 10)
            var setFavor = setTimeout(() => {
                if(initFavor.current > favorCount + 3) {
                    setFavorCount(favorCount + Math.floor(Math.random() * 3 + 1))
                } else {
                    setFavorCount(initFavor.current)
                }
            }, 10)
            var setDislike = setTimeout(() => {
                if(initDislike.current > dislikeCount + 10) {
                    setDislikeCount(dislikeCount + Math.floor(Math.random() * 10 + 1))
                } else {
                    setDislikeCount(initDislike.current)
                }
            }, 10)
        }

        if(likeCount === initLike.current) {
            clearTimeout(setLike)
            count++
        }
        if(favorCount === initFavor.current) {
            clearTimeout(setFavor)
            count++
        }
        if(dislikeCount === initDislike.current) {
            clearTimeout(setDislike)
            count++
        }
        if(count === 3) {
            setFirstRender(false)
        }
    }, [likeCount, favorCount, dislikeCount,firstRender])
    

    

    const handleUltiClick = (type) => {
        if (customer.status === "active") {
            switch (type) {
                case "favorite":
                    setFavorite(!favorite)
                    if(dislike) {
                        setDislike(false)
                        setDislikeCount(dislikeCount - 1)
                    }
                    if(report) {
                        setReport(false)
                    }
                    if(!favorite) {
                        setFavorCount(favorCount + 1)
                    }
                    else {
                        setFavorCount(favorCount - 1)
                    }
                    break;
                case "like":
                    setLike(!like)
                    if(dislike) {
                        setDislike(false)
                        setDislikeCount(dislikeCount - 1)
                    }
                    if(report) {
                        setReport(false)
                    }
                    if(!like) {
                        setLikeCount(likeCount + 1)
                    }
                    else {
                        setLikeCount(likeCount - 1)
                    }
                    break;
                case "dislike":
                    setDislike(!dislike)
                    if(like) {
                        setLike(false)
                        setLikeCount(likeCount - 1)
                    }
                    if(favorite) {
                        setFavorite(false)
                        setFavorCount(favorCount - 1)
                    }
                    if(!dislike) {
                        setDislikeCount(dislikeCount + 1)
                    }
                    else {
                        setDislikeCount(dislikeCount - 1)
                    }
                    break;
                case "report":
                    setReport(!report)
                    if(like ) {
                        setLike(false)
                        setLikeCount(likeCount - 1)
                    }
                    if(favorite ) {
                        setFavorite(false)
                        setFavorCount(favorCount - 1)
                    }
                    break;
                default:
                    break;
            }
        }
        else {
            CreateNotification("error","You need to log in first",`${type} fail`)
        }
    }

    return (
        <React.Fragment>
            <Button onClick={() => setActive(!active)} className="ultility">
                <MoreHorizIcon />
            </Button>
            <Button
                onClick={() => handleUltiClick("favorite")}
                id={favorite ? "favorite" : ""}
                className={active ? "subUltility ultiActive" : "subUltility"}
            >
                <FavoriteIcon />
            </Button>
            <Button
                onClick={() => {handleUltiClick("like")}}
                id={like ? "like" : ""}
                className={active ? "subUltility ultiActive" : "subUltility"}
            >
                <ThumbUpIcon />
            </Button>
            <Button
                onClick={() => {handleUltiClick("dislike")}}
                id={dislike ? "dislike" : ""}
                className={active ? "subUltility ultiActive" : "subUltility"}
            >
                <ThumbDownIcon />
            </Button>
            <Button
                onClick={() => {handleUltiClick("report")}}
                id={report ? "report" : ""}
                className={active ? "subUltility ultiActive" : "subUltility"}
            >
                <ReportProblemIcon />
            </Button>
            <div className="postTitle">
                {post.title.length > 45
                ? post.title.substring(0, 45 + 1) + "..."
                : post.title}
            </div>

            <div className="postBody">{post.body}</div>
            <div className="footer">
                <div className="counterBox">
                    <div className="counter favorCount"><FavoriteIcon /> {favorCount}</div>
                    <div className="counter likeCount"> <ThumbUpIcon /> {likeCount}</div>
                    <div className="counter dislikeCount"> <ThumbDownIcon /> {dislikeCount}</div>
                </div>
                <div className="publishedDate">{post.createdAt.substring(0,10)}</div>
            </div>
        </React.Fragment>
    );
}

export default PostContent;
