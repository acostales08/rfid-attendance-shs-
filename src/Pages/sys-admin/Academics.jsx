import React, { useEffect, useState } from 'react';

import { ReusableTabs, CourseContent, SectionContent, YearLevelContent, SemesterContent, SubjectContent, ControlledBackdrop } from '../../Components';


const Academics = () => {
  const [ loading, setLoading ] = useState(true)
 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  const tabs = [
    { label: 'Strand', content: <CourseContent/>, text: "Strand" },
    { label: 'Sections', content: <SectionContent/>, text: "Sections" },
    { label: 'Year Level', content: <YearLevelContent/>, text: "Year Level" }
  ];

  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <div className='h-full w-full bg-[#f3f0f2] p-2'>
        <div className="w-full flex justify-center items-center">
          <ReusableTabs tabs={tabs}/>
        </div>
      </div>      
    )}
    </>
  );
}

export default Academics;
