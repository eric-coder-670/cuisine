import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const navigation = [
  {
    title: "Accueil",
    href: "/accueil",
    // icon: <Dashboard />,
  },
  {
    title: "recipes",
    href: "/recette",
  },
  {
    title: "Create recipes",
    href: "/create",
  },
  {
    title: "Plats",
    href: "/plats",
  },
  {
    title: "Cards",
    href: "/cards",
  },
  {
    title: "Grid",
    href: "/grid",
  },
  {
    title: "Table",
    href: "/table",
  },
  {
    title: "Forms",
    href: "/forms",
  },
  {
    title: "Breadcrumbs",
    href: "/breadcrumbs",
  },
  {
    title: "About",
    href: "/about",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="bg-dark"
 
    >
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                {navi.icon}
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
