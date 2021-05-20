import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FramePage from './FramePage';
import axios from 'axios';
import _DiaryList from './diaries/_DiaryList'
import { Card } from '@shopify/polaris'

function _Diary() {
  const { title } = useParams();
  const [diary, setDiary] = useState(null);

  useEffect(function(){
    axios.get(`https://diary-api23.herokuapp.com/v1/getDiary/${ title }`)
      .then(response => {
        setDiary(response.data);
      })
      .catch(err => console.error(err));
  }, [title]);

  const diaryPage =  (
    <Card>
      { diary && <_DiaryList key={ diary._id} diary={ diary }/> }
    </Card>
  );

  return (
    <div>
      <FramePage component={ diaryPage } />
    </div>
  )
}

export default _Diary
