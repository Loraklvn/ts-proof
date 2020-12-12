import React from "react";
import { Spinner } from "react-bootstrap";
import { CustomDiv } from "./CustomElements";

const CustomSpinner = (): React.ReactElement => {
    return (
        <>
            <CustomDiv className={'d-flex justify-content-center mt-5 pt-5'}>
                <Spinner style={{width: 100, height: 100}} className={'mt-5'} animation="border" variant="secondary" />
            </CustomDiv>
            <h3 className={'text-center'}>Cargando...</h3>
        </>
    );
}

export default CustomSpinner;