import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FramePage from './FramePage';
import axios from 'axios';
import DiaryList from './diaries/Diary_List'
import { Card } from '@shopify/polaris'
import SkeletonDiary from './skeleton/SkeletonDiary'

function _Diary() {
  const { title } = useParams();
  const [diary, setDiary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function(){
    setIsLoading(true);
    axios.get(`https://diary-api23.herokuapp.com/v1/getDiary/${ title }`)
      .then(response => {
        setDiary(response.data);
      })
      .then(() => setIsLoading(false))
      .catch(err => console.error(err));
  }, [title]);

  const diaryPage =  (
    <Card>
      { diary && <DiaryList key={ diary._id} diary={ diary }/> }
    </Card>
  );

  return (
    <div>
      <FramePage component={ isLoading ? <SkeletonDiary /> : diaryPage } />
    </div>
  )
}

export default _Diary
