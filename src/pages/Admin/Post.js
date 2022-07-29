import React , { useState } from 'react'

function Post({post}) {

    const [open, setOpen] = useState(false);

    

  return (
    <div onClick={() => setOpen(!open)} className={open ? 'adminPostContent expand' : 'adminPostContent'}>
        <div className='adminPost adminPostID'>{post.id}</div>
        <div className='adminPost adminPostAuthor'>{post.author}</div>
        <div className='adminPost adminPostTag'>{post.tag}</div>
        <div className='adminPost adminPostCreatedAt'>{post.createdAt.substring(0,10)}</div>
        <div className='adminPost adminPostActions'>

        </div>
        <div className='adminPost adminPostBody'> {post.body}</div>
    </div>
  )
}

export default Post