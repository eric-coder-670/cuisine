import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const FullLayout = () => {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/list/category`);
      const { categories } = response.data;
      setCategory(categories);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/********Header**********/}
      <Header listCategory={category} />
      <div
        className="pageWrapper d-lg-flex"
        style={{ display: "flex", flexGrow: 1 }}
      >
        {/********Sidebar**********/}
        <aside
          className="sidebarArea shadow"
          id="sidebarArea"
          style={{overflowY: "auto" }}
        >
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea" style={{ flex: "1", overflowY: "auto" }}>
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
