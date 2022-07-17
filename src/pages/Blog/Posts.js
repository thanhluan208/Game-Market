import React, { useState,useRef,useCallback, useEffect } from 'react'

import PostContent from './PostContent'

import { useStore} from '../../Store'
import { CreateNotification } from '../../Component/Notification'

function Posts({posts,tag}) {
    const tagState = ['one','two','three']

    const [currentPage,setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [Posts, setPosts] = useState([...posts])

    let test1 = [1,2,3,4,5]
    let test2 = ['6','7','8','9','10']

    console.log("test1",test1,"test2",test2)
    test1 = [...test1, ...test2]
    console.log("new test1",test1)
    
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
        if(customer.posts.length > 0)
        {
            CreateNotification("success","Post created successfully",'Create Post Success')
            setPosts(P => {
                //concat new array with old array

                return [customer.posts[customer.posts.length - 1],...P] // concat new post to old post
            })
        }
    },[customer.posts])

    useEffect(() => {
        setPosts(posts.reverse())
    },[posts])

    console.log(Posts)

    return (
       <React.Fragment>
            {
            Posts.length > 0 ? 
                <div className='postContainer'>
                    {Posts.filter((post) =>  post.tag === tagState[tag - 1]).slice(0,currentPage*10).map((post, index) => {
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
