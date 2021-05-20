import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FramePage from './FramePage';
import axios from 'axios';
import Diary from './diaries/DiaryList'
import { Card } from '@shopify/polaris'

function _Diary() {
  const { title } = useParams();
  const [diary, setDiary] = useState(null);

  useEffect(function(){
    axios.get(`http://localhost:4000/v1/getDiary/${ title }`)
      .then(response => {
        setDiary(response.data);
      })
      .catch(err => console.error(err));
  }, [title]);

  const diaryPage =  (
    <Card>
      { diary && <Diary key={ diary._id} diary={ diary } button={ false }/> }
    </Card>
  );

  return (
    <div>
      <FramePage component={ diaryPage } />
    </div>
  )
}

export default _Diary
