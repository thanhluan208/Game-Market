import React, { useEffect, useState, useRef, useCallback } from "react";

import api from "../../api/api";

import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    api
      .get(
        "/posts?_sort=" +
          sortBy +
          "&_start=" +
          (currentPage * 10 - 10) +
          "&_end=" +
          currentPage * 10
      )
      .then((res) => {
        if(posts.length === 0) {
          setPosts(res.data);
        }
        if (posts.length > 0 ) {
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
  }, [currentPage, sortBy]);

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
    },[currentPage,maxPage]);

    console.log(currentPage)

  return (
    <div className="adminPostsContainer">
      <div className="adminPostsBox">
        <div className="adminPostsHeader">ID</div>
        <div className="adminPostsHeader">Author</div>
        <div className="adminPostsHeader">Tag</div>
        <div className="adminPostsHeader">CreatedAt</div>
        <div className="adminPostsHeader">Actions</div>
      </div>
      <div className="adminPosts">
        {posts.length > 0 ? (
          posts.map((post, index) => {
            if(index === currentPage * 10 - 1) {
              return(
                <div key={index} ref={lastPost}>
                  <Post post={post}/>
                </div>
              )
            } else {
              return(
                <div key={index}>
                  <Post post={post}/>
                </div>
              )
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
