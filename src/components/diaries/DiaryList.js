import React, { useContext, useState, useCallback, useEffect } from 'react'
import { Card, Form, FormLayout, TextField, ButtonGroup, Button } from '@shopify/polaris'
import { EditMinor, DeleteMinor } from '@shopify/polaris-icons';
import { DiaryContext } from '../MainPage'

function DiaryList(props) {
  const [title, setTitle] = useState(props.diary.title);
  const [description, setDescription] = useState(props.diary.description);
  const [change, setChange] = useState(true);

  useEffect(() => {
    setChange(title.replace(/ /g, '') === props.diary.title.replace(/ /g, '') && description.replace(/ /g, '') === props.diary.description.replace(/ /g, ''));
  }, [title, description, props]);

  const diaryContext = useContext(DiaryContext);

  function handleClick(){
    window.location = `/diary/${ props.diary.title }`;
  }

  const handleTitleChange = useCallback(value => {
    setTitle(value);
  }, []);

  const handleDescriptionChange = useCallback(value => {
    setDescription(value);
  }, []);

  const diaryCardSectionMarkUp = !props.diary.edit ? (
    <Card.Section 
      title={ props.diary.title } 
      actions={ props.button && [ 
        { 
          content: 'more', 
          onAction: handleClick
        },
        {
          icon: EditMinor,
          onAction: diaryContext.edit.bind(this, props.diary._id)
        },
        {
          icon: DeleteMinor,
          onAction: diaryContext.delete.bind(this, props.diary._id),
          destructive: true
        }
      ]}
    >
      <p>{ props.diary.description }</p>
    </Card.Section>
  ) : (
    <Card.Section>
      <Form onSubmit={ diaryContext.submitChange.bind(this, props.diary._id, title, description) }>
        <FormLayout>
          <TextField value={ title } onChange={ handleTitleChange }/>
          <TextField value={ description } multiline={ 10 } onChange={ handleDescriptionChange }/>
        </FormLayout>
        <ButtonGroup>
          <Button primary disabled={ change } submit>Save change</Button>
          <Button destructive onClick={ diaryContext.edit.bind(this, props.diary._id)}>Discard</Button>
        </ButtonGroup>
      </Form>
    </Card.Section>
  );

  return (
    <div>
      { diaryCardSectionMarkUp }
    </div>
  )
}

export default DiaryList
