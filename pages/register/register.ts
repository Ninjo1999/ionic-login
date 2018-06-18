import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})

export class RegisterPage {
	
	createSuccess = false;
	registerCredentials = { email: '', password: ''};

	constructor(private navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController) { }

	public register() {
		this.auth.register(this.registerCredentials).subscribe(success => {
			if (success) {
				this.createSuccess = true;
				this.showPopup("Success", "Account erstellt.");
			} else {
				this.showPopup("Error", "Account konnte nicht erstellt werden.");
			}
		},
			error => {
				this.showPopup("Error", error);
			});
	}

	showPopup(title, text) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: [
				{
					text: 'OK',
					handler: data => {
						if (this.createSuccess) {
							this.navCtrl.popToRoot();
						}
					}
				}
			]
		});
		alert.present();
	}
}
