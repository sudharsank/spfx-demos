import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

export function useIndicator(label: string, description: string) {
    return (
        <>
            <ProgressIndicator label={label} description={description} />
        </>
    );
}