import { createContext, useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'

import api from '../config'

const DisplayContext = createContext()

export const DisplayProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [newReleases, setNewReleases] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [categories, setCategories] = useState([])

  //call function
  useEffect(() => {
    displayPlaylist(api)
  })

  const displayPlaylist = async (api) => {
    try {
      const formData = new URLSearchParams()
      formData.append('grant_type', 'client_credentials')

      const response = await fetch(api.authUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization:
            'Basic ' +
            new Buffer.from(api.clientId + ':' + api.clientSecret).toString(
              'base64'
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })
      const token = await response.json()

      const [albums, playlists, categories] = await Promise.all([
        fetch(`${api.baseUrl}/browse/new-releases`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(`${api.baseUrl}/browse/featured-playlists`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(`${api.baseUrl}/browse/categories`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
          },
        }),
      ])
      const data = await albums.json()
      const data2 = await playlists.json()
      const data3 = await categories.json()
      setNewReleases(data.albums.items)
      setPlaylists(data2.playlists.items)
      setCategories(data3.categories.items)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DisplayContext.Provider
      value={{
        newReleases,
        categories,
        playlists,
        isLoading,
      }}
    >
      {children}
    </DisplayContext.Provider>
  )
}

export default DisplayContext
