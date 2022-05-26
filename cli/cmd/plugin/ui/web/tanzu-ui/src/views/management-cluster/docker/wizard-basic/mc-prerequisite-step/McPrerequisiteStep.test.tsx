// React imports
import React from 'react';

// Library imports
import { act, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// App imports
import McPrerequisiteStep from './McPrerequisiteStep';
import { CriService } from '../../../../../swagger-api';

describe('McPrerequisiteStep', () => {
    CriService.getContainerRuntimeInfo = jest.fn();
    // test('should render', async () => {
    //     const view = render(<McPrerequisiteStep />);
    //     await waitFor(() => {
    //         expect(view).toBeDefined();
    //     });
    // });
    // test('connect api should be called', async () => {
    //     render(<McPrerequisiteStep />);
    //     await waitFor(() => {
    //         expect(CriService.getContainerRuntimeInfo).toHaveBeenCalledTimes(1);
    //     });
    // });
    test('show successful message', () => {
        render(
            <McPrerequisiteStep
                tabStatus={[]}
                setTabStatus={(_status) => {
                    console.log('abc');
                }}
                key={1}
                submitForm={() => {
                    console.log('testing');
                }}
                handleValueChange={() => console.log('last')}
                provider="docker"
            />
        );
        expect(
            screen.getByText('Management cluster with the Docker daemon requires minimum allocated 4 CPUs and total memory of 6GB.')
        ).toBeTruthy();
        // eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug();
    });
});
