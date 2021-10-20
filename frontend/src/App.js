import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ItemListScreen from './screens/ItemListScreen'
import LotListScreen from './screens/LotListScreen'
import AuctionListScreen from './screens/AuctionListScreen'
import LoginScreen from './screens/LoginScreen'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/items' component={ItemListScreen} />
          <Route path='/lots' component={LotListScreen} />
          <Route path='/auctions' component={AuctionListScreen} />
          <Route path='/login' component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
