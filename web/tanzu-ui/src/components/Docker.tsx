import React, { ChangeEvent, useContext } from "react";
import styled from "styled-components";

import { Store } from "../store";
import DisplayFormData from "./DisplayFormData";
import DockerForm from "./DockerForm";
import TestRender from "./TestRender";


const FormContainer = styled.div`
    padding: 50px 0;
`;

function Docker () {
    return (
        <FormContainer>
            <DockerForm></DockerForm>
            <DisplayFormData></DisplayFormData>
            <TestRender></TestRender>
        </FormContainer>
    )
}

export default Docker;