import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Cart } from "react-bootstrap-icons";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const HomeContent = React.lazy(() => import('home/HomeContent'))
const SearchContent = React.lazy(() => import('search/SearchContent'))
const CheckoutContent = React.lazy(() => import('checkout/CheckoutContent'))

const Frame = ({ items = [], page = "home", children }) => (
  <Router>

  <Container>
    <Navbar bg="dark" expand="lg">
      <Link to='/' style={{ color: "white" }}>

        Pokeshop
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to='/' style={{ color: "white" }}>
            Home
          </Link>
          <Link to='/search' style={{ color: "white" }}>
            Search
          </Link>
        </Nav>
        <a
          href={page === "checkout" ? "/" : "http://localhost:8082/checkout"}
          style={{
            paddingLeft: 10,
            paddingBottom: 15,
          }}
        >
          <Cart color="white" size={30} />
          <span style={{ color: "white", fontWeight: "bold", paddingLeft: 5 }}>
            {items.reduce((a, { count }) => a + count, 0)}
          </span>
        </a>
      </Navbar.Collapse>
    </Navbar>
    <Container>
      <Switch>
        <Route path='/' exact>
          <React.Suspense fallback={() => <div>Loading</div>}>
            <HomeContent />
          </React.Suspense>
        </Route>
        <Route path='/search'>
          <React.Suspense fallback={() => <div>Loading</div>}>
            <SearchContent />
          </React.Suspense>
        </Route>
        <Route path='/checkout'>
          <React.Suspense fallback={() => <div>Loading</div>}>
            <CheckoutContent />
          </React.Suspense>
        </Route>
      </Switch>
    </Container>
  </Container>
  </Router>
);

export default connect((state) => state)(Frame);
