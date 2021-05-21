import React from 'react';
import { SkeletonPage, SkeletonBodyText, Card, SkeletonDisplayText} from '@shopify/polaris';

function Skeleton() {
  return (
    <div>
      <SkeletonPage>
        <Card title={ <SkeletonDisplayText size="small"/> }>
          <Card.Section>
            <SkeletonBodyText />
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText />
          </Card.Section>
        </Card>
        <Card title={ <SkeletonDisplayText size="small"/> }>
          <Card.Section>
            <SkeletonBodyText />
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText />
          </Card.Section>
        </Card>
        <Card title={ <SkeletonDisplayText size="small"/> }>
          <Card.Section>
            <SkeletonBodyText />
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText />
          </Card.Section>
        </Card>
      </SkeletonPage>
    </div>
  )
}

export default Skeleton
