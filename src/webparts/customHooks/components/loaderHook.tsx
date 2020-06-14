import * as React from 'react';
import { IStackProps, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Spinner, SpinnerSize, SpinnerLabelPosition } from 'office-ui-fabric-react/lib/Spinner';

const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };
const tokens = {
    sectionStack: {
        childrenGap: 10,
    },
    spinnerStack: {
        childrenGap: 10,
    },
};
export function useLoader(content: string, spinSize: SpinnerSize, labelPosition?: SpinnerLabelPosition) {
    return (
        <Stack tokens={tokens.sectionStack}>
            <Stack {...rowProps} tokens={tokens.spinnerStack}>
                <Spinner label={content} size={spinSize} labelPosition={labelPosition ? labelPosition : 'top'} />
            </Stack>
        </Stack>
    );
}