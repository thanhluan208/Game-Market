import React, { useState,useRef,useCallback, useEffect } from 'react'

import PostContent from './PostContent'

import { useStore} from '../../Store'
import { CreateNotification } from '../../Component/Notification'

function Posts({posts,tag}) {
    const [currentPage,setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [Posts, setPosts] = useState([...posts])

    const [state,] = useStore()
    const customer = state.customer

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

    useEffect(() => {
        if(customer.posts.length > 0 && customer.posts[customer.posts.length - 1].tag === tag)
        {
            setPosts(P => {
                //concat new array with old array
                return [customer.posts[customer.posts.length - 1],...P] // concat new post to old post
            })
        }
    },[customer.posts])

    useEffect(() => {
        setPosts(posts)
    },[posts])


    return (
       <React.Fragment>
            {
            Posts.length > customer.posts.length ? 
                <div className='postContainer'>
                    {Posts.slice(0,currentPage*10).map((post, index) => {
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
