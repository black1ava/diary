import React, { useEffect, useState } from 'react';
import { EmptyState, Card } from '@shopify/polaris';
import FramePage from './FramePage';
import DiaryList from './diaries/DiaryList'
import axios from 'axios';

function MainPage() {
  const [diaries, setDiaries] = useState([]);

  useEffect(function(){
    axios.get('http://localhost:4000/v1/getDiaries')
      .then(response => setDiaries(response.data))
      .catch(err => console.error(err))
  }, []);

  const mainPageMarkUp = !diaries.length ? (
    <Card sectioned>
      <EmptyState 
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        heading="Start to make your diary today"
        action={{
          content: "Write diary",
          url: "/diaries"
        }}
      >
        <p>Write your amazing daily life, journey and wonderful things you have done today and tell the the world who you really are!!</p>
      </EmptyState>
    </Card>
  ) : (
    <Card title="Your Diaries">
      {
        diaries.map(diary => <DiaryList key={ diary._id } diary={ diary } button={ true }/>)
      }
    </Card>
  );

  return (
    <div>
      <FramePage component={ mainPageMarkUp }/>
    </div>
  )
}

export default MainPage
