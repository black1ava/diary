import React, { useState, useCallback} from 'react'
import { Frame, TopBar, ActionList, Navigation } from '@shopify/polaris';
import { HomeMajor, ComposeMajor } from '@shopify/polaris-icons';

function FramePage(props) {
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [mobileNavigationToggle, setMobileNavigationToggle] = useState(false);

  const handleUserMenuToggle = useCallback(function(){
    setUserMenuToggle(prevUserMenuToggle => !prevUserMenuToggle);
  }, []);

  const handleSearchTextChange = useCallback(function(value){
    setSearchValue(value);
    setSearchResultsVisible(value.length > 0);
  }, []);

  const action = useCallback(function(value){
    console.log(value);
  }, []);

  const handleNavigationToggle = useCallback(function(){
    setMobileNavigationToggle(prevMobileNavigationToggle => !prevMobileNavigationToggle);
  }, []);

  const userMenuMarkUp = (
    <TopBar.UserMenu 
      name="Tharath"
      initials="T"
      actions={[
        {
          items: [{ content: 'Action 1'}, { content: 'Action 2'}]
        },
        { 
          items: [{ content: 'Other Actions'}] 
        }
      ]}
      open={ userMenuToggle }
      onToggle={ handleUserMenuToggle }
    />
  );

  const searchFieldMarkUp = (
    <TopBar.SearchField 
      value={ searchValue }
      placeholder="Search"
      onChange={ handleSearchTextChange }
    />
  );

  const searchResultsMarkUp = (
    <ActionList 
      items={[
        { content: 'Option1', onAction: action },
        { content: 'Option2' },
        { content: 'Option 3'}
      ]}
    />
  );

  const topBarMarkUp = (
    <TopBar 
      showNavigationToggle
      userMenu={ userMenuMarkUp }
      searchField={ searchFieldMarkUp }
      searchResults={ searchResultsMarkUp }
      searchResultsVisible={ searchResultsVisible }
      onNavigationToggle={handleNavigationToggle}
    />
  );

  const navigationMarkUp = (
    <Navigation location="/diary">
      <Navigation.Section 
        items={[
          {
            url: '/',
            label: 'Home',
            icon: HomeMajor,
            selected: false
          },
          {
            url: '/diaries',
            label: 'Write diary',
            icon: ComposeMajor
          }
        ]}
      />
    </Navigation>
  );

  return (
    <div>
      <Frame
        topBar={ topBarMarkUp }
        navigation={ navigationMarkUp }
        showMobileNavigation={ mobileNavigationToggle }
        onNavigationDismiss={ handleNavigationToggle }
      >
        {props.component}
      </Frame>
    </div>
  )
}

export default FramePage
