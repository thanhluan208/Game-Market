import { Grid } from '@mui/material'
import React from 'react'

function UserPosts({posts}) {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <div>{post.title}</div>
            <div>{post.content}</div>
          </div>

        ) 
      })}
    </div>
  )
}

export default UserPosts