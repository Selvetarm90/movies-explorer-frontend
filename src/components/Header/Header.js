import './Header.css';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {

  function HeaderNavigation() {
    if (props.loggedIn) {
      if (props.path) {
        return <Navigation header='white-authorized-header' />;
      }
      return <Navigation header='authorized-header' />;
    }
    return <Navigation header='no-authorized-header' />;
  }

  return (
    <header className={`header ${props.darkBackground ? 'header_dark' : ''}`}>
      <Link className='header__logo' to='/' />
      <Switch>
        <Route exact path='/'>
          <HeaderNavigation />
        </Route>

        <Route path={`/${props.path}`}>
          <HeaderNavigation />
        </Route>
      </Switch>
    </header>
  );
}
