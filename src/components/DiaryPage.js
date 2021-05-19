import React from 'react';
import { Layout, Card, Form, FormLayout, TextField } from '@shopify/polaris';
import FramePage from './FramePage';

function DiaryPage() {

  const diariesPageMarkUp = (
    <Layout sectioned>
      <Layout.AnnotatedSection
        title="Diary details"
        description="You can write your amazing story by giving it a title and tell us in detail in the body section."
      >
        <Card sectioned>
          <Form>
            <FormLayout>
              <TextField placeholder="title"/>
              <TextField placeholder="Description" multiline={ 10 }/>   
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

export default DiaryPage
