import React, { useContext } from "react";
import styled from "styled-components";
import { Store } from "../store";

const Container = styled.div`
    margin-top: 30px;
`;
function DisplayFormData() {
    const { state, dispatch } = useContext(Store);
    console.log('hi');
    return (
        <Container>{
            Object.entries(state.data).map(([key, val]) => {
                return (<div> {key} : {val}</div>)
            })
        }</Container>
    );
}

export default DisplayFormData;