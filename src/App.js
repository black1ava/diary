import React, { useState, useCallback} from 'react';
import {
  Frame,
  TopBar,
  ActionList,
  Navigation,
  Card,
  EmptyState,
  Form,
  FormLayout,
  TextField,
  Layout,
  Button
} from '@shopify/polaris'
import { ArrowLeftMinor, ComposeMajor } from '@shopify/polaris-icons';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [text, setText] = useState('');
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [navigationToggle, setNavigationToggle] = useState(false);
  const [isMakingDiary, setIsMakingDiary] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [diaryList, setDiaryList] = useState([]);

  const handleTextChange = useCallback(function(value){
    setText(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleUserMenuToggle = useCallback(function(){
    setUserMenuToggle(prevUserMenuToggle => !prevUserMenuToggle);
  }, []);

  const handleSearchResultsDismiss = useCallback(function(){
    setText('');
    setIsSearchActive(false);
  }, [])

  const handleNavigationToggle = useCallback(function(){
    setNavigationToggle(prevNavigationToggle => !prevNavigationToggle);
  }, []);

  const handleMakingDiaryToggle = useCallback(function(){
    setIsMakingDiary(prevIsMakingDiary => !prevIsMakingDiary);
  }, []);

  const handleTitleChange = useCallback(function(value){
    setTitle(value);
  }, []);

  const handleBodyChange = useCallback(function(value){
    setBody(value)
  }, [])

  const handleTitleClear = useCallback(function(){
    setTitle('');
  }, []);

  const handleBodyClear = useCallback(function(){
    setBody('');
  }, []);

  const handleSubmit = useCallback(function(){
    setDiaryList(prevList => [...prevList, { title, body, id: uuidv4() }]);
    setTitle('');
    setBody('');
    handleMakingDiaryToggle();
  }, [title, body, handleMakingDiaryToggle]);

  const handleDeleteDiary = useCallback(function(id){
    const newDiaryList = diaryList.filter(function(diary){
      return diary.id !== id
    });

    setDiaryList(newDiaryList);
  }, [diaryList]);

  const changePageBtn = !isMakingDiary ? {
    label: 'Making diary',
    icon: ComposeMajor,
    onClick: function(){ handleMakingDiaryToggle() }
  } : {
    label: 'Main page',
    icon: ArrowLeftMinor,
    onClick: function(){ handleMakingDiaryToggle() }
  }

  const userMenuMarkUp = (
    <TopBar.UserMenu 
      name="Tharath"
      initials="T"
      actions={[
        {
          items: [{ content: 'Action 1' }, { content: 'Action2' }]
        },
        {
          items: [{ content: 'Other Actions' }]
        }
      ]}
      open={ userMenuToggle }
      onToggle={ handleUserMenuToggle }
    />
  );

  const searchFieldMarkUp = (
    <TopBar.SearchField 
      value={ text }
      onChange={ handleTextChange }
      placeholder="Search"
    />
  );

  const searchResultsMarkUp = (
    <ActionList 
      items={[
        { content: 'Option 1' },
        { content: 'Option 2' },
        { content: 'Option 3' }
      ]}
    />
  );

  const topBarMarkUp = (
    <TopBar
      showNavigationToggle
      userMenu={ userMenuMarkUp }
      searchResultsVisible={ isSearchActive }
      searchField={ searchFieldMarkUp }
      searchResults={ searchResultsMarkUp }
      onSearchResultsDismiss={ handleSearchResultsDismiss }
      onNavigationToggle={ handleNavigationToggle }
    />
  );

  const navigationMarkUp =(
    <Navigation location="/">
      <Navigation.Section 
        items={[
          changePageBtn
        ]}
      />
    </Navigation>
  );

  const _mainPage = !diaryList.length ? (
    <Card sectioned>
      <EmptyState 
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        heading="Start to make your diary today"
        action={{
           content: 'Write a diary', 
           onAction: function(){
             handleMakingDiaryToggle();
           }
        }}
        fullWidth
      >
        <p>
          Write your amazing daily life, your journey and amazing things you have done today and let the world know who your really are!!
        </p>
      </EmptyState>
    </Card>
  ): (
    <Card title="Three recent diaries" sectioned>
      { diaryList.map(function(diary, index){
        return index >= diaryList.length - 3 && (
          <Card.Section 
            title={ diary.title }
            actions={[
              { content: 'Delete', onAction: handleDeleteDiary.bind(this, diary.id)}
            ]}
            key={ diary.id }
          >
            <p>{ diary.body }</p>
          </Card.Section>
        );
      })}
    </Card>
  );

  const diaryMarkUp = (
    <Layout sectioned>
      <Layout.AnnotatedSection
        title="Diary details"
        description="You can write your amazing story by giving it a title and tell us in detail in the body section."
      >
        <Card sectioned>
          <Form onSubmit={ handleSubmit }>
            <FormLayout>
              <TextField placeholder="Title" value={ title } onChange={ handleTitleChange } clearButton onClearButtonClick={ handleTitleClear }/>
              <TextField placeholder="Body" multiline={ 10 } value={ body } onChange={ handleBodyChange } clearButton onClearButtonClick={ handleBodyClear }/>
              <Button submit>Save diary</Button>
            </FormLayout>
          </Form>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  );

  const mainPage = isMakingDiary ? diaryMarkUp : _mainPage;

  return (
    <div>
      <Frame 
        topBar={ topBarMarkUp }
        showMobileNavigation={ navigationToggle }
        onNavigationDismiss={ handleNavigationToggle }
        navigation={ navigationMarkUp }
      >
        { mainPage }
      </Frame>
    </div>
  )
}

export default App
