import * as React from 'react';
import { Header } from './components';

export const App: React.FunctionComponent<{}> = props => {
  return (
    <div className="container-fluid">
      <Header />
      {props.children}
    </div>
  );
}
