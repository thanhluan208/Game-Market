import React, { useState,useRef,useCallback, useEffect } from 'react'

import PostContent from './PostContent'

function Posts({posts,tag}) {
    const tagState = ['one','two','three']

    const [currentPage,setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const observer = useRef()
    const lastPost = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
            }
        }
        , {threshold: 1})
        if (node) observer.current.observe(node)
    }
    , [hasMore])

    useEffect(() => {
        if (currentPage > 5) {
            setHasMore(false)
        }
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1)
    },[tag])

    return (
       <React.Fragment>
            {
            posts.length > 0 ? 
                <div className='postContainer'>
                    {posts.filter((post) =>  post.tag === tagState[tag - 1]).slice(0,currentPage*10).map((post, index) => {
                        if( index === currentPage*10-1) {
                            return (
                                <div key={index} className='postBox' ref={lastPost}>
                                    <PostContent post={post}/>
                                </div>
                            )}
                        else {
                            return (
                                <div key={index} className='postBox'>
                                    <PostContent post={post}/>
                                </div>
                            )
                        }
                    }
                    )}
                </div>
            :
                <div className='loading'>LOADING...</div>
            }
       </React.Fragment>
    )
}

export default Posts
