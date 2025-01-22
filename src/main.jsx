import React, { use, useState } from "react";
// styles
import './styles.css';
import './rg-menu.css'
import './footerstyle.css';
import './filterstyles.css';
import './pages/aboutusstyles.css'
// functions
import WidgetList1 from "./first-list";
import WidgetList2 from "./second-list";
import WidgetList3 from "./third-list";
import WidgetList4 from "./fourth-list";
import Footer1 from "./footer";
import MainMenu from "./main-menu";
import SliderMain from "./slidermainpage";
import PreLoader from "./preloader";

function Main(){
  const [loadingMain, setLoadingMain] = useState(0);
  setTimeout(() => {
    setLoadingMain(1)
  },1000)
    return (
      <>
      <PreLoader Loaded1={loadingMain}></PreLoader>
      <MainMenu/>
        <main className="position-all-of-main">
          <div>
            <SliderMain/>
          </div>
          <div>
            <WidgetList1/> 
          </div>
          <div>
            <WidgetList2/>
          </div>
          <div>
           <WidgetList3/>
          </div>
          <div>
            <WidgetList4/>
          </div>
          <div>
            <Footer1/>
          </div>
        </main>
      </>
    )

}


export default Main;
