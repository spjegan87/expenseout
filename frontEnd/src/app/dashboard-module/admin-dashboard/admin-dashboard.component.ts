import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AppService } from '../../core-module/services/app.service';
declare var feather: any;
declare var $: any;
/**
 * Author: Padma Priya CK,Naveen
 * Module : dashboard
 * Powered by : Infiniti software solutions
 */
@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
	/**
 * tab active
 */
	public activeTab: number;
	/**
 * tab content
 */
	public tabData: any = [];
	/**
 * approval report tab variable
 */
	public approvalReport: any = [];
	/**
 * popupVal
 */
	public popupVal: any = {
		'flag': false,
		'module': '',
		'value': {}
	};
	/**
 * output data
 */
	@Output() public reportCreate: EventEmitter<any> = new EventEmitter();
	/**
 * input for dashboard
 */
	public dashboardData: any;
	/**
 * Dsc : chArt loader
 */
	public chartLoader: boolean = true;
	/**
 * bar chart service variable
 */
	public barChartData: any;
/**
 * budget bar chart service variable
 */
	public budgetChartData: any;

	/**
 * Loader
 */
	public loader: boolean = true;
	/**
 * filterData
 */
	@Input() public filterData: any;
	/**
 * user chart variable
 */
	public userChartData: any;
	public moduleName: string = "";
	@Output() public emitModule = new EventEmitter();

	/**
 * top spending user & Top Spending Categories
 */
	public topSpendingVar: any = {
		user: {},
		category: {}
	};
	constructor(private appService: AppService) { }
	public ngAfterViewInit(): void {
		feather.replace();
	}
	/**
   * ngoninit
   */
	public ngOnInit(): void {
		this.approvalReport = [
			{
				heading: 'Expense Report Wise',
				id: 'tab1'
			},
			{
				heading: 'Advance Report Wise',
				id: 'tab2'
			}
		];
		this.activeTab = 0;
		this.moduleName = "adminDashboard";
		this.emitModule.emit(this.moduleName);
		this.adminUser();
	}
	/**
   * admin user
   */
	public adminUser(): void {
		this.appService.httpPost(this.moduleName, { filters: this.filterData }, 'fetchRecords', 'false').subscribe((data) => {
			this.tabData = data.content;
			this.loader = false;
			this.adminChartService();
			this.budgetChartService();
		});
	}
	/**
   * Desc: topSpending
   */
	public topSpending(name: string): void {
		this.appService.httpPost(this.moduleName, { filters: this.filterData }, name, 'false').subscribe((data) => {
			// if (name === 'topSpendingUsers') {
			// 	this.topSpendingVar['user'] = data.content;
			// } else {
			// 	this.topSpendingVar['category'] = data.content;
			// }
			let index = name == 'topSpendingUsers' ? 'user' : 'category';
			this.topSpendingVar[index] = data.content;
		});
	}
	/**
	 * popUpInfo
	 */
	public popUpInfo(_val: any): void {
		this.popupVal = {
			'flag': false,
			'module': '',
			'value': {}
		}
	}
	/**
	 * showUserInfo
	 */
	public showUserInfo(email: string): void {
		this.popupVal = {
			'flag': true,
			'module': 'userSettings',
			'value': {
				'value': {
					'emailId': email
				},
				"module": "userSettings",
				"action": "getUserDescription"
			}
		}
	}
	/**
   * toggle tab
   */
	public toggletab(id: any, _val: string): void {
		this.activeTab = id;
	}
	/**
   * create report
   */
	public createReport(val: string) {
		this.reportCreate.emit(val);
	}
	/**
   * user dashboard service
   */
	public adminChartService(): void {
		this.appService
			.httpPost('pieChartDetails', { filters: this.filterData }, 'barChart', 'false')
			.subscribe((data) => {
				this.barChartData = data.content;
				this.barChartData['colors'][0] = eval(this.barChartData['colors'][0]);
				this.barChartData['tooltip']['y']['formatter'] = eval(this.barChartData['tooltip']['y']['formatter']);
				this.donutChartService();
			});
	}

	/**
   * budget barchart service
   */
	 public budgetChartService(): void {
		this.appService
			.httpPost('pieChartDetails', { filters: this.filterData }, 'budgetbarChart', 'false')
			.subscribe((data) => {
				this.budgetChartData = data.content;		
				this.budgetChartData['tooltip']['y']['formatter'] = eval(this.budgetChartData['tooltip']['y']['formatter']);
			});
	}
	/**
   * donut chart
   */
	public donutChartService(): void {
		this.appService
			.httpPost('pieChartDetails', { filters: this.filterData }, 'adminPieChart', 'false')
			.subscribe((data) => {
				this.userChartData = data.content;
				for (let index in this.userChartData) {
					if (this.userChartData[index]['series'].length >= 1) {
						this.userChartData[index]['tooltip']['y']['formatter'] = eval(
							this.userChartData[index]['tooltip']['y']['formatter']
						);
						this.userChartData[index]['plotOptions']['pie']['donut']['labels']['total']['formatter'] = eval(
							this.userChartData[index]['plotOptions']['pie']['donut']['labels']['total']['formatter']
						);
					}
				};
				// setTimeout(() => {
				this.chartLoader = false;
				// }, 10);
				this.topSpending('topExpenseCategories');
				this.topSpending('topSpendingUsers');
			});
	}
	/**
	 * showFilter for mobile view
	 */
	public showFilter(): void {
		$('.cls-filter-container').addClass('cls-filter-close');
		$('.cls-bottom-container').removeClass('d-block');
	}
	/**
	 * showFilter for mobile view
	 */
	public openMobileTool() {
		$('.cls-bottom-container').addClass('d-block');
		$('.cls-bottom-container').removeClass('close-mobile');
		// setTimeout(()=>{
		$('.cls-mbl-tool-filter').addClass('circle1');
		$('.cls-tool-create').addClass('circle2');
		// },200);
	}
	/**
	* close mobile bottom button
	*/
	public closeMobile() {
		// setTimeout(()=>{
		// $('.cls-bottom-container').removeClass('d-block');
		// },200)
		$('.cls-mbl-tool-filter').removeClass('circle1');
		$('.cls-tool-create').removeClass('circle2');
		$('.cls-bottom-container').removeClass('d-block');
	}
}
