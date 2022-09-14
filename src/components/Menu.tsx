import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to={'/users'} className="nav-link" aria-current="page" href="#">
              <span data-feather="home" className="align-text-bottom"></span>
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/users'} className="nav-link" aria-current="page" href="#">
              <span data-feather="home" className="align-text-bottom"></span>
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/products'} className="nav-link" aria-current="page" href="#">
              <span data-feather="home" className="align-text-bottom"></span>
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/orders'} className="nav-link" aria-current="page" href="#">
              <span data-feather="home" className="align-text-bottom"></span>
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
