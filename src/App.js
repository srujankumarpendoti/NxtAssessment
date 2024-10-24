import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import NotFound from './components/NotFound'

import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Assessment from './components/Assessment'
import Results from './components/Results'
// import Results from "./routes/Results";
// import NotFound from "./routes/NotFound";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/assessment" component={Assessment} />
        <ProtectedRoute exact path="/results" component={Results} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App

// 12-10-2024 2hr 6.5hr 2hr
