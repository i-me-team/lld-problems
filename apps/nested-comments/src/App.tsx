import SidebarTree from './components/SidebarTree.tsx';
import DATA from './data/index.ts';

const App: React.FC = () => {
  return <SidebarTree data={DATA} />;
};

export default App;
