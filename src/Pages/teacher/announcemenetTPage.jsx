import React, {useEffect, useState} from 'react'
import { Paper } from '@mui/material'
import { AnnouncementContent } from '../../Components'
import { fetchAnnouncement } from '../../utils/api'

const AnnouncemenetTPage = () => {
  const [ announce, setAnnounce ] = useState([])

  useEffect(()=> {
    fetchAnnouncementData()
  }, [])

  const fetchAnnouncementData = async() => {
    try {
      const response = await fetchAnnouncement('/list-of-activated-announcement')
      setAnnounce(response.data)
    } catch (error) {
      
    }
  }
  return (
    <div className='h-fit w-full bg-[#f3f0f2] p-5 sm:px-1 px-32 flex justify-center items-center flex-col gap-4'>
      {announce.length > 0? announce.map(item => (
        <div key={item.index} className='flex justify-center items-center'>
          <AnnouncementContent title={item.date} body={item.body}/>            
        </div>
      )) : (
          <div className="flex justify-center items-center w-full">
            <div className="h-full w-full">
              <Paper elevation={3}>
                <div className="p-5">
                  <h1 className="text-center text-3xl text-gray-600">No Announcement</h1>                    
                </div>
              </Paper>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnnouncemenetTPage 