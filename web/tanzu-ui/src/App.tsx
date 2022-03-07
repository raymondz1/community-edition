// React imports
import React, {createContext, useContext} from "react";
import { Routes, Route, Link } from "react-router-dom";

// App imports
import HeaderComponent from "./shared/components/header/header.component";
import { CdsDivider } from "@cds/react/divider";
import { CdsNavigation, CdsNavigationItem, CdsNavigationStart } from "@cds/react/navigation";
import { CdsIcon } from "@cds/react/icon";
import LandingPage from "./components/LandingPage";
import Docker from "./components/Docker";
import styled from "styled-components";
import { Store } from "./store";

const Container = styled.div`
    position: relative;
    min-height: 400px;
`;
const MainBody = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
`;

function App() {
    // Note: this is for testing/setup of dark mode; sets body theme to dark
    // Will be refactored
    document.body.setAttribute("cds-theme", "dark");
    document.body.setAttribute("class", "dark");

    const {state} = useContext(Store);

    return (
        <main cds-layout="vertical align:stretch" cds-text="body">
            {/* <HeaderComponent/> */}
            <MainBody>
                <CdsNavigation expanded={state.ui.navExpanded} onExpandedChange={(e:any) =>{ const t=e.target;t.expanded=!t.expanded}}>
                    <CdsNavigationStart>Root Start</CdsNavigationStart>
                    <CdsNavigationItem>
                        <CdsIcon shape="home" size="sm"></CdsIcon>
                        <a href="#">
                            Home
                        </a>
                    </CdsNavigationItem>
                    <CdsNavigationItem>
                        <a href="#">
                        <CdsIcon shape="help-info" size="sm"></CdsIcon>
                        Help
                        </a>
                    </CdsNavigationItem>
                    <CdsNavigationItem>
                        <a href="#">
                        <CdsIcon shape="file" size="sm"></CdsIcon>
                        Documentation
                        </a>
                    </CdsNavigationItem>
                </CdsNavigation>
                <section cds-layout="grid gap:md">
                    <div cds-layout="col:4">
                        <img src={"/welcome.png"}/>
                    </div>
                    <div cds-layout="col:8">
                        <Routes>
                            <Route path="/" element={<LandingPage />}></Route>
                            <Route path="/docker" element={<Docker />}></Route>
                        </Routes>
                    </div>
                </section>
            </MainBody>
            
        </main>
    );
}

export default App;