import React, { useContext } from 'react';
import { EmptyState, Card } from '@shopify/polaris'
import FramePage from './FramePage';
import { AppContext } from '../App'

function MainPage() {

  const app = useContext(AppContext);

  console.log(app);

  const mainPageMarkUp = (
    <Card sectioned>
      <EmptyState 
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        heading="Start to make your diary todat"
        action={{
          content: "Write diary",
          url: "/diaries"
        }}
      >
        <p>Write your amazing daily life, journey and wonderful things you have done today and tell the the world who you really are!!</p>
      </EmptyState>
    </Card>
  );
  return (
    <div>
      <FramePage component={ mainPageMarkUp }/>
    </div>
  )
}

export default MainPage
