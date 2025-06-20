/**
 * Desc: application configuration
 * Author: Shailesh
 * Modified By: Padma Priya CK
 */
export interface IConfigInterface {
	CORPORATE_NAME: string;
    /**
     * Current language
     */
    CURRENTLANGUAGE: string;
    /**
     * Authentication status
     */
    AUTH_STATUS: boolean;
    /**
     * User name
     */
    USER_NAME: string;
    /**
     * email
     */
    USER_EMAIL : string;
    /**
     * corporate id
     */
    CORPORATE_ID : string;
    /**
     * User id
     */
    USER_ID: string;
    /**
     * User type
     */
    USER_TYPE: string;
    /**
     * Default page
     */
    LANDING_PAGE: string;
    /**
     * currency type
     */
    USER_CURRENCY: string;
    /**
     * config settings
     */
    CONFIGSETTINGS : object;
    /**
     * receipt
     */
    RECEIPT_MANDATORY : object;
    /**
     * eligiblity criteria
     */
    ELIGIBILITY_CRITERIA : string
    /**
     * Admin Interface type
     */
    ADMIN_TYPE: string;
    /**
     * CSRF value
     */
    CSRF:string;
    /**
     * Sixty date check in Allowance
     */
    sixtyDateFlow:boolean;
    /**
     * Expense Valult Upload Changes
     */
     EXPENSE_VAULT_CHANGES:boolean;
}
