import React from 'react'
import { SkeletonBodyText, Card, SkeletonPage} from '@shopify/polaris'

function SkeletonDiary() {
  return (
    <div>
      <SkeletonPage>
        <Card sectioned>
          <SkeletonBodyText lines={ 5 }/>
          <SkeletonBodyText lines={ 5 }/>
        </Card>
      </SkeletonPage>
    </div>
  )
}

export default SkeletonDiary
