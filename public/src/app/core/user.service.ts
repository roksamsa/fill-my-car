import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  public user = new BehaviorSubject(this.user);
  userData = this.user.asObservable();

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function (userData) {
        if (user) {
          resolve(userData);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  isUserLoggedIn() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function (userData) {
        if (user) {
          resolve(userData);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
