import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPageModule } from '../login/login.module';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})

export class LoginPage {

	loading: Loading;
	registerCredentials = { email: '', password: ''};

	constructor(private navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

	public createAccount() {
		this.navCtrl.push('RegisterPage');
	}

	public login() {
		this.showLoading()
		this.auth.login(this.registerCredentials).subscribe(allowed => {
			if (allowed) {
				this.navCtrl.setRoot('HomePage');
			} else {
				this.showError("Ungültige E-Mail-Adresse und / oder falsches Passwort");
			}
		},
			error => {
				this.showError(error);
			});
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Bitte warten...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	showError(text) {
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
			title: 'Fehler',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present();
	}
}
