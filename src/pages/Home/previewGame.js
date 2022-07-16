import React from 'react'

import { Grid } from '@mui/material'
import { Button } from '@mui/material'

import PreviewVid from './previewVid'




function PreviewGame() {




  return (
    <Grid className="previewContainer" container >
        <Grid className="previewBox" item xs={5}>
            <div className='span'></div>
            <div className='previewTitle'>Pre-order Assasin Creed Valhala now!</div>
            <div className='addToCart'>
                <div className='priceTag'>$85</div>
                <Button className='btn'>Pre-order</Button>
            </div>
        </Grid>
        <Grid className='previewPlayBox' item xs={2}>
            <PreviewVid />
        </Grid>
        <Grid className='previewImgBox' item xs={5}>
           
        </Grid>
    </Grid>
  )
}

export default PreviewGame