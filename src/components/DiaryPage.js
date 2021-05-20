import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Card, Form, FormLayout, TextField, Button, Toast, ButtonGroup, Modal } from '@shopify/polaris';
import axios from 'axios';
import FramePage from './FramePage';

function DiaryPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [toastActive, setToastActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [discardActive, setDiscardActive] = useState(true);

  useEffect(function(){
    setDiscardActive(title.length === 0 && description.length === 0);
  }, [title, description]);

  const handleTitleChange = useCallback(function(value){
    setTitle(value);
  }, []);

  const handleDescriptionChange = useCallback(function(value){
    setDescription(value);
  }, []);

  const handleToastActive = useCallback(() => setToastActive(active => !active), []);

  const handleSubmit = useCallback(function(){
    axios.post('http://localhost:4000/v1/postDiary', {title, description})
      .then(response => console.log(response))
      .catch(err => console.error(err));

      setTitle('');
      setDescription('');
      handleToastActive();
  }, [title, description, handleToastActive]);

  const handleModalActivate = useCallback(() => {
    setModalActive(active => !active);
  }, []);

  const modalActivator = (<Button destructive onClick={ handleModalActivate } disabled={ discardActive }>Discard</Button>);

  const toastMarkUp = toastActive && (
    <Toast content="Diary saved" onDismiss={ handleToastActive } />
  );

  const modalMarkUp = (
    <Modal
      activator={ modalActivator }
      open={ modalActive }
      onClose={ handleModalActivate}
      title="The diary won't be saved. Are you sure want to discard?"
      primaryAction={{
        content: 'Discard',
        destructive: true,
        onAction: function(){ 
          setTitle('');
          setDescription('');
          handleModalActivate();
        }
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleModalActivate
        }
      ]}
    >

    </Modal>
  );

  const diariesPageMarkUp = (
    <Layout sectioned>
      <Layout.AnnotatedSection
        title="Diary details"
        description="You can write your amazing story by giving it a title and tell us in detail in the description section."
      >
        <Card sectioned>
          <Form onSubmit={ handleSubmit }>
            <FormLayout>
              <TextField value={ title } placeholder="Title" onChange={ handleTitleChange } autoComplete="off" />
              <TextField value={ description } placeholder="Description" multiline={ 10 } onChange={ handleDescriptionChange }/>   
              { toastMarkUp }
              <ButtonGroup>
                <Button submit primary>Save Diary</Button>
                { modalMarkUp }
              </ButtonGroup>
            </FormLayout>
          </Form>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  );

  return (
    <div>
      <FramePage component={ diariesPageMarkUp }/>
    </div>
  )
}

export default DiaryPage;
