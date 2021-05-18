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
  Layout
} from '@shopify/polaris'
import { ArrowLeftMinor, ComposeMajor } from '@shopify/polaris-icons';

function App() {
  const [text, setText] = useState('');
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [navigationToggle, setNavigationToggle] = useState(false);
  const [isMakingDiary, setIsMakingDiary] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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
  }, [])

  const handleBodyChange = useCallback(function(value){
    setBody(value)
  }, [])

  const handleTitleClear = useCallback(function(){
    setTitle('');
  }, []);

  const handleBodyClear = useCallback(function(){
    setBody('');
  }, [])

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

  const cardMarkUp = (
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
      >
        <p>
          Write your amazing daily life, your journey and amazing things you have done today and let the world know who your really are!!
        </p>
      </EmptyState>
    </Card>
  );

  const diaryMarkUp = (
    <Layout sectioned>
      <Layout.AnnotatedSection
        title="title"
        description="Description"
      >
        <Card sectioned>
          <Form>
            <FormLayout>
              <TextField placeholder="Title" value={ title } onChange={ handleTitleChange } clearButton onClearButtonClick={ handleTitleClear } autoComplete="off"/>
              <TextField placeholder="Body" multiline={ 10 } value={ body } onChange={ handleBodyChange } clearButton onClearButtonClick={ handleBodyClear }/>
            </FormLayout>
          </Form>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  );

  const mainPage = isMakingDiary ? diaryMarkUp : cardMarkUp

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
