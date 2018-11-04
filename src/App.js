import React, {Component} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import theme from './utils/theme';

import ScrollToTop from './Components/ScrollToTop';
import Landing from './Pages/Landing/Landing';
import RoomFetcher from './Pages/RoomList/RoomFetcher';
import Nav from './Components/Nav';
import About from './Pages/About/About';
import RoomViewFetcher from './Pages/RoomView/RoomViewFetcher';
import Footer from './Components/Footer';
import Contact from './Pages/Contact/Contact'

const StyledApp = styled.div `
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`

const TopMargin = styled.div`
  padding-top: 80px;
`

class App extends Component {
  render() {
    
    return (
      <Router>
        <ThemeProvider theme={theme} >
          <StyledApp>
            <ScrollToTop>
              {/* render Nav component everywhere except "/" */}
              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/" component={Nav} />
              </Switch>
              <Switch>
                <Route path="/rooms/:id" component={RoomViewFetcher}/>
                <Route path="/rooms" render={props => <TopMargin> <RoomFetcher/> </TopMargin>} />
              </Switch>
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Switch>
                <Route path="/" exact component={null} />
                <Route path="/" component={Footer} />
              </Switch>
            </ScrollToTop>
          </StyledApp>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
