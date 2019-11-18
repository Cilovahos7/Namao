import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.class';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public isLogged: any = false;

  constructor(private afAuth: AngularFireAuth, private toastController: ToastController) {
    afAuth.authState.subscribe( user => (this.isLogged = user));
  }

  // toast
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      color: 'danger',
      duration: 1000
    });
    toast.present();
  }

  // Login
  async onLogin(user: User) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.presentToast('Correo o contraseña no validas!');
    }
  }

  // Registro
  async onRegister(user: User) {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.presentToast('No se registro!');
    }
  }
}
