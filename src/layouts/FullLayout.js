import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios"


const FullLayout = () => {
  const [category, setaCategory] = useState([]);

  const fetchCtaegory = async () => {

    const response = await axios.post(`http://localhost:5000/list/category`);
    const  {categories}  = response.data;
    console.log(categories);
    setaCategory(categories);
  }

  useEffect(() => {
    fetchCtaegory();
  }, []);


  return (
    <main>
      {/********header**********/}
      <Header listCategory={category} />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea" >
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
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
