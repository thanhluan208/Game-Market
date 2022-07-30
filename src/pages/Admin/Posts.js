import React, { useEffect, useState, useRef, useCallback } from "react";

import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import api from "../../api/api";

import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [sortId , setSortId] = useState(0);
  const [sortAuthor , setSortAuthor] = useState(0);
  const [sortTag , setSortTag] = useState(0);
  const [sortCreatedAt , setSortCreatedAt] = useState(0);

  useEffect(() => {
    api
      .get(
        "/posts?" +
          "&_start=" +
          (currentPage * 10 - 10) +
          "&_end=" +
          currentPage * 10
      )
      .then((res) => {
        if (posts.length === 0) {
          setPosts(res.data);
        }
        if (posts.length > 0) {
          setPosts([...posts, ...res.data]);
        }
        if (res.headers["x-total-count"] === 0) {
          setMaxPage(0);
        } else {
          setMaxPage(Math.ceil(res.headers["x-total-count"] / 10));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && currentPage < maxPage) {
            setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [currentPage, maxPage]
  );

  const handleSortId = () => {
    setSortId(sortId + 1);
    if(sortId % 2 === 1) {
      console.log("sorting")
      posts.sort((a, b) => a.id - b.id);
    }
    else {
      posts.sort((a, b) => b.id - a.id);
    }
  }

  const handleSortAuthor = () => {
    setSortAuthor(sortAuthor + 1);
    if(sortAuthor % 2 === 1) {
      console.log("sorting")
      posts.sort((a, b) => a.author.localeCompare(b.author));
    }
    else {
      posts.sort((a, b) => b.author.localeCompare(a.author));
    }
  }

  const handleSortTag = () => {
    setSortTag(sortTag + 1);
    if(sortTag % 2 === 1) {
      console.log("sorting")
      posts.sort((a, b) => a.tag.localeCompare(b.tag));
    }
    else {
      posts.sort((a, b) => b.tag.localeCompare(a.tag));
    } 
  }

  const handleSortCreateAt = () => {
    setSortCreatedAt(sortCreatedAt + 1);
    if(sortCreatedAt % 2 === 1) {
      console.log("sorting")
      posts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
    }
    else {
      posts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
    }
  }

  return (
    <div className="adminPostsContainer">
      <div className="adminPostsBox">
        <div className="adminPostsHeader">
          ID
          <Button onClick={() => handleSortId()} className="sortBtn">
            <SortIcon />
          </Button>
        </div>
        <div className="adminPostsHeader">
          Author
          <Button onClick={() => handleSortAuthor()} className="sortBtn">
            <SortIcon />
          </Button>
        </div>
        <div className="adminPostsHeader">
          Tag
          <Button onClick={() => handleSortTag()} className="sortBtn">
            <SortIcon />
          </Button>
        </div>
        <div className="adminPostsHeader">
          CreatedAt
          <Button onClick={() => handleSortCreateAt()} className="sortBtn">
            <SortIcon />
          </Button>
        </div>
        <div className="adminPostsHeader">
          Actions
        </div>
      </div>
      <div className="adminPosts">
        {posts.length > 0 ? (
          posts.map((post, index) => {
            if (index === currentPage * 10 - 1) {
              return (
                <div key={index} ref={lastPost}>
                  <Post post={post} />
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <Post post={post} />
                </div>
              );
            }
          })
        ) : (
          <div> LOADING ... </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
