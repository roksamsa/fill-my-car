import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) { }

  get getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(userData => {
        if (user) {
          console.log(user);
          console.log(userData);
          resolve(userData);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  public updateCurrentUser(value: any): Promise<any> {
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

  get isUserLoggedIn(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(userData => {
        if (user) {
          resolve(userData);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
