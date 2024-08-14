'use client';
import { Provider } from 'react-redux';
import { store } from './store';

const ReduxProvider: React.FC<{children: React.ReactElement}> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
