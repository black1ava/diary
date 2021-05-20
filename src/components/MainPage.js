import React, { useEffect, useState, useCallback, createContext } from 'react';
import { EmptyState, Card } from '@shopify/polaris';
import FramePage from './FramePage';
import DiaryList from './diaries/DiaryList'
import axios from 'axios';

export const DiaryContext = createContext();

function MainPage() {
  const [diaries, setDiaries] = useState([]);

  const fetchDiary = useCallback(() => {
    axios.get('http://localhost:4000/v1/getDiaries')
      .then(response => {
        setDiaries(response.data.map(d => ({...d, edit: false })));
      })
      .catch(err => console.error(err))
  }, []);

  useEffect(function(){
    fetchDiary();
  }, [fetchDiary]);

  const deleteDiary = useCallback(id => {
    axios.delete('http://localhost:4000/v1/deleteDiary', { data: { id }})
      .then(response => console.log(response.data))
      .then(() => {
        fetchDiary();
      })
      .catch(err => console.error(err))
  }, [fetchDiary]);

  const editDiary = useCallback(id => {
    const updateDiaries = diaries.map(diary => {
      if(diary._id === id){
        diary.edit = !diary.edit;
      }

      return diary
    });

    setDiaries(updateDiaries);
  }, [diaries]);

  const handleSumbitChangeDiary = useCallback((id, title, description) => {
    axios.post('http://localhost:4000/v1/updateDiary', { id, title, description })
      .then(response => console.log(response.data))
      .then(() => fetchDiary())
      .catch(err => console.error(err));
  }, [fetchDiary]);

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
        diaries.map(diary => (
          <DiaryContext.Provider value={{ delete: deleteDiary, edit: editDiary, submitChange: handleSumbitChangeDiary }} key={ diary._id }>
            <DiaryList diary={ diary } button={ true }/>
          </DiaryContext.Provider>
        ))
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
