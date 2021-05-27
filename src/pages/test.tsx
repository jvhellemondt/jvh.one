import * as React from 'react'
import Layout from '../layouts/Index'

export default class IndexPage extends React.Component {
  render(): React.ReactNode {
    return (
      <Layout pageName="Home">
        <div>
          <h1>Test</h1>
          Hi
        
        </div>
      </Layout>
    )
  }
}
