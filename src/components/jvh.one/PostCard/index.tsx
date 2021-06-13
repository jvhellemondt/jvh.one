import React from 'react';

export type IndexProps = {}

const Index = (props: IndexProps): React.ReactElement => {
  // eslint-disable-next-line no-console
  console.log({
    IndexProps: props
  });

  return (
    <div>
      Index
    </div>
  );
};

export default Index;
