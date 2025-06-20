import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth-module/login/login.component';
import { urlConfig } from './core-module/config/url';
import { HomeGuard, AuthGuard } from './core-module/guards/auth.guard';
import { NetworkErrorComponent } from './shared-module/components/network-error/network-error.component';
import { UnauthorizedPageComponent } from './shared-module/components/unauthorized-page/unauthorized-page.component';
const routes: Routes = [
	{
		path: urlConfig.ROUTES.auth,
		loadChildren: () => import('./auth-module/auth.module').then((mod) => mod.AuthModule),
		canActivate: [ HomeGuard ]
	},
	{
		path: urlConfig.ROUTES.home,
		loadChildren: () => import('./home-module/home.module').then((mod) => mod.HomeModule),
		canActivate: [ AuthGuard ]
	},
	{
		path: urlConfig.ROUTES.networkError,
		component: NetworkErrorComponent
	},
	{
		path: urlConfig.ROUTES.unauthorizedPage,
		component: UnauthorizedPageComponent
	},
	{
		path:'sso/:id/:sso',
		pathMatch: 'full',
		component: LoginComponent
    },
	{
		path: '',
		redirectTo: urlConfig.ROUTES.auth,
		pathMatch: 'full'
		// canActivate: [HomeGuard]
	},
	{
		path: '**',
		redirectTo: urlConfig.ROUTES.auth,
		pathMatch: 'full'
		// canActivate: [HomeGuard]
	}
];

/**
 * Author: Shailesh R
 * Desc: App routing
 */
@NgModule({
	imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
