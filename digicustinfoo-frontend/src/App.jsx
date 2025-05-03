import { Route, Switch } from 'wouter';
import Auth from './pages/auth';
import RegistrationSuccess from './pages/registration-success';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <Switch>
          <Route path="/" component={Auth} />
          <Route path="/success" component={RegistrationSuccess} />
          <Route component={Auth} />
        </Switch>
      </div>
    </div>
  );
}

export default App;