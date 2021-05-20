import React from 'react';
import { Card } from '@shopify/polaris';

function Diary_List(props) {
  return (
    <div>
      <Card.Section 
        title={ props.diary.title }
      >
        <p style={{ whiteSpace: 'pre-line' }}>{ props.diary.description }</p>
      </Card.Section>
    </div>
  )
}

export default Diary_List;
