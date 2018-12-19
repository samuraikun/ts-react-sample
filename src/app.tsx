import * as React from 'react';
import { Header, About } from './components';

export const App: React.FunctionComponent<{}> = props => {
  return (
    <div className="container-fluid">
      <Header />
    </div>
  );
}
