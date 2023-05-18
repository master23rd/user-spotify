import React, { Component, useContext } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import DisplayContext from '../../../context/DisplayContext'
import '../styles/_discover.scss'

function Discover() {
  const { newReleases, categories, playlists, isLoading } =
    useContext(DisplayContext)

  // console.log(newReleases)
  if (!isLoading && (!newReleases || newReleases.length === 0)) {
    return <p>No new release yet</p>
  }

  return isLoading ? (
    <h2>Loading.. </h2>
  ) : (
    <div className='discover'>
      <DiscoverBlock
        text='RELEASED THIS WEEK'
        id='released'
        data={newReleases}
      />
      <DiscoverBlock text='FEATURED PLAYLISTS' id='featured' data={playlists} />
      <DiscoverBlock
        text='BROWSE'
        id='browse'
        data={categories}
        imagesKey='icons'
      />
    </div>
  )
}

export default Discover
