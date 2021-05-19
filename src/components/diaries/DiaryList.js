import React from 'react'
import { Card } from '@shopify/polaris'

function DiaryList(props) {

  function handleClick(){
    if(props.button){
      window.location = `/diary/${ props.diary.title }`;
    }
  }

  return (
    <div onClick={ handleClick } style={{ cursor: 'pointer' }}>
      <Card.Section title={ props.diary.title }>
        <p>{ props.diary.description }</p>
      </Card.Section>
    </div>
  )
}

export default DiaryList
