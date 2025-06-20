import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { urlConfig } from '../core-module/config/url';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: urlConfig.ROUTES.dashboard,
        loadChildren: () => import('../dashboard-module/dashboard-module.module').then(mod => mod.DashboardModuleModule)
      },
      {
        path: urlConfig.ROUTES.manageprofile,
        loadChildren: () => import('../manageuserprofile/manageuserprofile.module').then(mod => mod.ManageuserprofileModule)
      },
      {
        path: urlConfig.ROUTES.myProfile,
        loadChildren: () => import('../myprofile/myprofile.module').then(mod => mod.MyprofileModule)
      },
      {
        path: urlConfig.ROUTES.masterData,
        loadChildren: () => import('../masterdata/masterdata.module').then(mod => mod.MasterdataModule)
      },
      {
        path: urlConfig.ROUTES.createExpense,
        loadChildren: () => import('../create-expense-report/create-expense-report.module').then(mod => mod.CreateExpenseReportModule)
      },
      {
        path: urlConfig.ROUTES.expenseVault,
        loadChildren: () => import('../expense-vault/expense-vault.module').then(mod => mod.ExpenseVaultModule)
      },
      {
        path: urlConfig.ROUTES.expenseReport,
        loadChildren: () => import('../expense-report-module/expense-report-module.module').then(mod => mod.ExpenseReportModuleModule)
      },
      {
        path: urlConfig.ROUTES.expenseAdminReport,
        loadChildren: () => import('../expense-admin-report/expense-admin-report.module').then(mod => mod.ExpenseAdminReportModule)
      },
      {
        path: urlConfig.ROUTES.pendingApprovals,
        loadChildren: () => import('../pending-approval-module/pending-approval-module.module').then(mod => mod.PendingApprovalModuleModule)
      },
      {
        path: urlConfig.ROUTES.pendingSettlement,
        loadChildren: () => import('../pending-settlement-module/pending-settlement-module.module').then(mod => mod.PendingSettlementModuleModule)
      },
      // {
      //   path: urlConfig.ROUTES.expenseSummary,
      //   loadChildren: () => import('../expense-summary-module/expense-summary-module.module').then(mod => mod.ExpenseSummaryModuleModule)
      // },
      {
        path: urlConfig.ROUTES.policySettings,
        loadChildren: () => import('../policy-setting-module/policy-setting-module.module').then(mod => mod.PolicySettingModuleModule)
      },
      {
        path: urlConfig.ROUTES.advanceModule,
        loadChildren: () => import('../advance-request-module/advance-request-module.module').then(mod => mod.AdvanceRequestModuleModule)
      },
      {
        path: urlConfig.ROUTES.customReport,
        loadChildren: () => import('../custom-report/custom-report.module').then(mod => mod.CustomReportModule)
      },
      {
        path: urlConfig.ROUTES.customReportList,
        loadChildren: () => import('../custom-report-list/custom-report-list.module').then(mod => mod.CustomReportListModule)
      },
      {
        path: urlConfig.ROUTES.schedule,
        loadChildren: () => import('../schedule-report/schedule-report.module').then(mod => mod.ScheduleReportModule)
      }
    ]
  }



];

/**
 * Author: Shailesh R
 * Desc: Home routing module controls afterlogin pages
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
