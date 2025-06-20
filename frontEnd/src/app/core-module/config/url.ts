/**
 * Desc: url route maintainance
 * Author: Shailesh
 * Modified By: Padma Priya CK
 */
interface IUrlConfig {
    /**
     * Frontend server routes
     */
    ROUTES: {
        [key: string]: string
    };
}

export const urlConfig: IUrlConfig = {
    /**
     * Frontend URL'S hashed using 'SHA1'
     */
    ROUTES: {
        auth: '66a36e77fd002579809717841f998f4d21cd5913',
        login: '2736fab291f04e69b62d490c3c09361f5b82461a',
        signup: '4e3d91444d2d47e7ed5711fdce33fc7928a8a7f9',
        forms: '453ca94c1e10b3851ca2d2b9fe5902abb50b2db6',
        home: 'e83249bd3ba79932e16fb1fb5100dafade9954c2',
        dashboard: 'f90453ec712ce4505cc425e7e881e1d58ea274c3',
        manageprofile: "5b7dcd14a4faa2cdd54cf6eb8d4bc35da31914a1",
        myProfile: "E882526C723449B470AEC88E24B10412341A6881",
        resetPassword : '871a52d22eaef6448ebe9f7f31f74d9b3706a80c',
        masterData: '7700311598E7F82FB6E526EF49CDFD13863A90BD',
        createExpense: "B5241A3978E7463B6D5B40C5F6E1EB65A04FC001",
        expenseVault: "0838A5F7D2D5AFA07539379F6FF4768AB0CC3B24",
        pendingApprovals: "768486ff6e1fee8077b5468291ab2f82b4dbeef1",
        expenseReport : "809D6F6292FE58719C5DF2582034B613E67159A8",
        expenseAdminReport:'192597903bdcd7deefeed43f968906217f619b38',
        pendingSettlement : "C5E1E3179D6E5DF41D9A9FBF7A1FC0CA36D421AB",
        expenseSummary : "D327CA02E21FB9E6AA1367D35F648DFA335384C3",
        policySettings : "C6DF4032DEE275BAB5EE270AC07EC069A63C79E5",
        advanceModule : "c478430ea110e81c2d3898df8123580a9bcdb282",
        networkError : "E8FC61CD1E621B85B7F08B140FEA40E74591A8AC",
        unauthorizedPage:"7886BB5849E7E5C8542CA79F1E58FF8AE03478A5",
        customReport:"DDD60860B679616ACC162BE39087B723EFE8B2FF",
        customReportList:"1546D8C9DE41F68C97406F7BA3096C1D08DCFF09",
        schedule:"11E9BA26C91A2DB7452A5EF9FF7051E19B6B377A",
        forgetPassword:"7DDDC12B5DAB96CD8CA8999F6AB2E442B0300879"
    }
};

