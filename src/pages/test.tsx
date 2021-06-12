import * as React from 'react';
import Layout from '../layouts/Index';

const TestPage = (): React.ReactElement => (
  <Layout pageName="Home">
    <div>
      <h1>Test</h1>
      Hi
    </div>
  </Layout>
);

export default TestPage;
