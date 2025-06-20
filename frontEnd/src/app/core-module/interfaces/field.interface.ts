/**
 * Desc: string configuration
 * Author: Shailesh
 * Powered by : Infiniti software solutions
 */
export interface IObject {
    [key: string]: string | number | object | undefined;
}
export interface IValidator {
    /**
     * Form control name
     */
    name: string;
    /**
     * Validation
     */
    validator: object;
    /**
     * Error message
     */
    message: string;
}
export interface IFieldConfig {
    /**
     * Form attributes
     */
    formattributes: {
        [key: string]: string
    };
    /**
     * Form elements
     */
    formelements: {
        [key: string]: string
    };
}


export interface alertConfig {
    alertInfo: {
        [key: string]: string
    }
}

