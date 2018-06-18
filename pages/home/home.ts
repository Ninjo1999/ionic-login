import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	username = '';
	email = '';

	constructor(private navCtrl: NavController, private auth: AuthServiceProvider) {
		let info = this.auth.getUserInfo();
		this.username = info['username'];
		this.email = info['email'];
	}

	public logout() {
		this.auth.logout().subscribe(succ => {
			this.navCtrl.setRoot('LoginPage');
		});
	}
}
