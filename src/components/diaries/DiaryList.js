import React, { useContext, useState, useCallback, useEffect } from 'react'
import { Card, Form, FormLayout, TextField, ButtonGroup, Button, Toast, Modal, TextContainer } from '@shopify/polaris'
import { EditMinor, DeleteMinor } from '@shopify/polaris-icons';
import { DiaryContext } from '../MainPage'

function DiaryList(props) {

  const [title, setTitle] = useState(props.diary.title);
  const [description, setDescription] = useState(props.diary.description);
  const [change, setChange] = useState(true);
  const [toastActive, setToastActive] = useState(false);
  const [discardModalActive, setDiscardModalActive] = useState(false);
  const [removeInAction, setRemoveInAction] = useState(false);

  useEffect(() => {

    setChange((title.replace(/ /g, '') === props.diary.title.replace(/ /g, '') && description.replace(/ /g, '') === props.diary.description.replace(/ /g, '')) || (title === '' || description === ''));

  }, [title, description, props]);


  const diaryContext = useContext(DiaryContext);


  function handleClick(){
    window.location = `/diary/${ props.diary._id }`;
  }


  const handleTitleChange = useCallback(value => {
    setTitle(value);
  }, []);


  const handleDescriptionChange = useCallback(value => {
    setDescription(value);
  }, []);


  const handleToastActive = useCallback(() => {
    setToastActive(active => !active);
  }, []);


  const handleRemoveInAction = useCallback(() => setRemoveInAction(prevState => !prevState), []);


  const handleSubmit = useCallback(() => {

    diaryContext.submitChange(props.diary._id, title, description);
    handleToastActive();

  }, [handleToastActive, diaryContext, props, title, description]);


  const handleDiscardModalToggle = useCallback(() => setDiscardModalActive(active => !active), []);


  const toastMarkUp = toastActive && <Toast content="Saved Change" onDismiss={ handleToastActive }/>


  const discardButtonModal = (<Button destructive onClick={ handleDiscardModalToggle }>Discard</Button>);
  

  const _handleClick = useCallback(() => {

    diaryContext.edit(props.diary._id);

    setTitle(props.diary.title);
    setDescription(props.diary.description);

    setChange(true);
    setDiscardModalActive(false);

  }, [diaryContext, props]);

  const discardButton = !change ? (

    <Modal
      title="Are you sure want to discard?"
      activator={ discardButtonModal }
      open={ discardModalActive }
      onClose={ handleDiscardModalToggle }
      primaryAction={{
        content: 'Discard',
        destructive: true,
        onAction: _handleClick
      }}
      secondaryActions={[
        { 
          content: 'Cancel',
          onAction: handleDiscardModalToggle
        }
      ]}
      sectioned
    >
      <TextContainer>
        <p>The change won't be saved!</p>
      </TextContainer>
    </Modal>

  ) : (

    <Button destructive onClick={ _handleClick }>Discard</Button>

  );

  const diaryCardSectionMarkUp = !props.diary.edit ? (

    <Card.Section 
      title={ props.diary.title } 
      actions={ props.button && [ 
        { 
          content: 'more', 
          onAction: handleClick,
          disabled: props.diary.description.length < 600,
          id: `more-${ props.diary.title.toLowerCase().replace(/ /g, '-') }`
        },
        {
          icon: EditMinor,
          onAction: diaryContext.edit.bind(this, props.diary._id),
          id: `edit-${ props.diary.title.toLowerCase().replace(/ /g, '-') }`
        },
        {
          icon: DeleteMinor,
          onAction: handleRemoveInAction,
          destructive: true,
          id: `delete-${ props.diary.title.toLowerCase().replace(/ /g, '-') }`
        }
      ]}
    >
      <p style={{ whiteSpace: 'pre-line' }}>
        { props.diary.description.length > 600 ? props.diary.description.substring(0, 600) + '...' : props.diary.description }
      </p>
    </Card.Section>

  ) : (

    <Card.Section>
      <Form onSubmit={ handleSubmit }>
        <FormLayout>
          <TextField value={ title } onChange={ handleTitleChange } placeholder="Title" id="title"/>
          <TextField value={ description } multiline={ 10 } onChange={ handleDescriptionChange } placeholder="Description" id="description"/>
        </FormLayout>
        <ButtonGroup>
          <Button primary disabled={ change } submit id="save-change">Save change</Button>
          { discardButton }
        </ButtonGroup>
      </Form>
    </Card.Section>

  );

  return (

    <div>
      { diaryCardSectionMarkUp }
      { toastMarkUp }
      <Modal
        title="Are you sure to delete this diary?"
        open={ removeInAction }
        onClose={ handleRemoveInAction }
        primaryAction={{
          content: 'Delete',
          onAction: diaryContext.delete.bind(this, props.diary._id),
          destructive: true
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleRemoveInAction
          }
        ]}
        sectioned
      >
        <TextContainer>
          <p>Note: You cannot restore after delete!</p>
        </TextContainer>
      </Modal>
    </div>
    
  )
}

export default DiaryList