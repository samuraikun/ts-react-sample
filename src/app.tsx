import * as React from 'react';
import { Header } from './components';
import { LoadingSpinnerComponent } from './common/components/spinner/loadingSpinner';

export const App: React.FunctionComponent<{}> = props => {
  return (
    <div className="container-fluid">
      <LoadingSpinnerComponent />
      <Header />
    </div>
  );
}
