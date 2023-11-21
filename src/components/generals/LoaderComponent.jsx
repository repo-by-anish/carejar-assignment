import React from "react";
import { Loader, Placeholder } from 'rsuite';

const LoaderComponent = () => {
    return (
        <div>
            <Placeholder.Paragraph active rows={8} rowHeight={50} />
        </div>
    )
}

export default LoaderComponent