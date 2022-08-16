// App imports
import { AwsDefaults } from '../default-service/AwsDefaults.service';
import { AwsResourceAction, FormAction, StoreDispatch } from '../../../../../shared/types/types';
import { AwsService, AWSVirtualMachine } from '../../../../../swagger-api';
import { AWSKeyPair } from '../../../../../swagger-api/models/AWSKeyPair';
import { AWS_ADD_RESOURCES } from '../../../../../state-management/actions/Resources.actions';
import { AWS_FIELDS } from '../../aws-mc-basic/AwsManagementClusterBasic.constants';
import { INPUT_CHANGE } from '../../../../../state-management/actions/Form.actions';
import { STORE_SECTION_FORM } from '../../../../../state-management/reducers/Form.reducer';

interface AwsOrchestratorProps {
    awsState: { [key: string]: any };
    awsDispatch: StoreDispatch;
    errorObject: { [key: string]: any };
    setErrorObject: (newErrorObject: { [key: string]: any }) => void;
}

export class AwsOrchestrator {
    static async initOsImages(props: AwsOrchestratorProps) {
        const { awsState, awsDispatch, setErrorObject, errorObject } = props;
        try {
            const osImages = await AwsService.getAwsosImages(awsState[STORE_SECTION_FORM].REGION);
            saveCurrentResourceData(awsDispatch, AWS_FIELDS.OS_IMAGE, osImages);
            setDefaultOsImage(awsDispatch, osImages);
            setErrorObject(removeErrorInfo(errorObject, AWS_FIELDS.OS_IMAGE));
        } catch (e) {
            clearPreviousResourceData(awsDispatch, AWS_FIELDS.OS_IMAGE);
            setErrorObject(addErrorInfo(errorObject, e, AWS_FIELDS.OS_IMAGE));
        }
    }

    static async initEC2KeyPairs(props: AwsOrchestratorProps, setKeyPairs: (keyPairs: AWSKeyPair[]) => void) {
        const { awsDispatch, setErrorObject, errorObject } = props;
        try {
            const keyPairs = await AwsService.getAwsKeyPairs();
            saveCurrentResourceData(awsDispatch, AWS_FIELDS.EC2_KEY_PAIR, keyPairs);
            setDefaultEC2KeyPair(awsDispatch, keyPairs);
            setErrorObject(removeErrorInfo(errorObject, AWS_FIELDS.OS_IMAGE));
            setKeyPairs(keyPairs);
        } catch (e) {
            clearPreviousResourceData(awsDispatch, AWS_FIELDS.EC2_KEY_PAIR);
            setErrorObject(addErrorInfo(errorObject, e, AWS_FIELDS.EC2_KEY_PAIR));
        }
    }
}

function clearPreviousResourceData(awsDispatch: StoreDispatch, resourceName: AWS_FIELDS) {
    awsDispatch({
        type: AWS_ADD_RESOURCES,
        resourceName: resourceName,
        payload: [],
    } as AwsResourceAction);
}

function saveCurrentResourceData(awsDispatch: StoreDispatch, resourceName: AWS_FIELDS, currentValues: any[]) {
    awsDispatch({
        type: AWS_ADD_RESOURCES,
        resourceName: resourceName,
        payload: currentValues,
    } as AwsResourceAction);
}

function setDefaultOsImage(awsDispatch: StoreDispatch, osImages: AWSVirtualMachine[]) {
    awsDispatch({
        type: INPUT_CHANGE,
        field: AWS_FIELDS.OS_IMAGE,
        payload: AwsDefaults.selectDefalutOsImage(osImages),
    } as FormAction);
}

function setDefaultEC2KeyPair(awsDispatch: StoreDispatch, keyPairs: AWSKeyPair[]) {
    awsDispatch({
        type: INPUT_CHANGE,
        field: AWS_FIELDS.EC2_KEY_PAIR,
        payload: AwsDefaults.selectDefalutEC2KeyPairs(keyPairs),
    } as FormAction);
}

function removeErrorInfo(errorObject: { [key: string]: any }, field: AWS_FIELDS) {
    const copy = { ...errorObject };
    delete copy[field];
    return copy;
}

function addErrorInfo(errorObject: { [key: string]: any }, error: any, field: AWS_FIELDS) {
    return {
        ...errorObject,
        [field]: error,
    };
}
