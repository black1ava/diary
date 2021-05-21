import React, { useState, useCallback, useEffect } from 'react'
import { Frame, TopBar, ActionList, Navigation, ThemeProvider } from '@shopify/polaris';
import { HomeMajor, ComposeMajor } from '@shopify/polaris-icons';
import axios from 'axios';

function FramePage(props) {

  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [mobileNavigationToggle, setMobileNavigationToggle] = useState(false);
  const [actionListItems, setActionListItems] = useState([]);
  const [lightMode, setLightMode] = useState(true);

  useEffect(() => {

    setLightMode(JSON.parse(localStorage.getItem('lightTheme')) ?? true);

    axios.get('https://diary-api23.herokuapp.com/v1/getDiaries')
      .then(response => {

        response.data.forEach(d => setActionListItems(items => {

          return ([...items, { content: d.title, url: `/diary/${ d._id }` }]);

        }));
      })
      .catch(err => console.error(err));

  }, []);


  const handleUserMenuToggle = useCallback(function(){
    setUserMenuToggle(prevUserMenuToggle => !prevUserMenuToggle);
  }, []);


  const handleSearchTextChange = useCallback(function(value){

    setSearchValue(value);
    setSearchResultsVisible(value.length > 0);

  }, []);


  const handleNavigationToggle = useCallback(function(){
    setMobileNavigationToggle(prevMobileNavigationToggle => !prevMobileNavigationToggle);
  }, []);


  const themeMode = lightMode ? 'light' : 'dark';
  const themeName = lightMode ? 'Dark mode' : 'Light mode';


  const handleThemeModeChange = useCallback(() => setLightMode(prevState => {

    localStorage.setItem('lightTheme', !prevState);
    return !prevState;

  }), []);

  const userMenuMarkUp = (

    <div id="user">
      <TopBar.UserMenu 
        name="Tharath"
        initials="T"
        actions={[
          {
            items: [{ content: themeName, onAction: handleThemeModeChange, id: "theme" }]
          }
        ]}
        open={ userMenuToggle }
        onToggle={ handleUserMenuToggle }
      />
    </div>

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
      items={ actionListItems }
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
            selected: props.home || false
          },
          {
            url: '/diaries',
            label: 'Write diary',
            icon: ComposeMajor,
            selected: props.diary || false
          }
        ]}
      />
    </Navigation>

  );

  return (

    <div>
      <ThemeProvider theme={{ colorScheme: themeMode }}>
        <Frame
          topBar={ topBarMarkUp }
          navigation={ navigationMarkUp }
          showMobileNavigation={ mobileNavigationToggle }
          onNavigationDismiss={ handleNavigationToggle }
        >
          {props.component}
        </Frame>
      </ThemeProvider>
    </div>
    
  )
}

export default FramePage
