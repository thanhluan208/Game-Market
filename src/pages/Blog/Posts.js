import React, { useState, useRef, useCallback, useEffect } from "react";

import api from "../../api/api";

import PostContent from "./PostContent";


function Posts({ tag }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [Posts, setPosts] = useState([]);


  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },[hasMore]);

  useEffect(() => {
    if (currentPage > 5) {
      setHasMore(false);
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    api
      .get(`/posts?tag=${tag}&_sort=createdAt&_order=desc`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tag]);

  return (
    <React.Fragment>
      {Posts.length > 0 ? (
        <div className="postContainer">
          {Posts.slice(0, currentPage * 10).map((post, index) => {
            if (index === currentPage * 10 - 1) {
              return (
                <div key={index} className="postBox" ref={lastPost}>
                  <PostContent post={post} />
                </div>
              );
            } else {
              return (
                <div key={index} className="postBox">
                  <PostContent post={post} />
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="loading">LOADING...</div>
      )}
    </React.Fragment>
  );
}

export default Posts;
