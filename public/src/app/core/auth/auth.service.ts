import { Injectable, NgZone } from '@angular/core';
import { FirebaseUserModel } from '../user/user.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FirebaseAuthService {

  static SetUserData: any;
  public userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    /* Saving user data in localstorage when logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  public EmailSignIn(email: string, password: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['nadzorna-plosca']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  public EmailSignUp(email: string, password: string): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificationMail() function when new user sign up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Send email verification when new user sign up
  public SendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  // Reset password
  public ForgotPassword(passwordResetEmail): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Sign in with Google
  public GoogleAuth(): Promise<void> {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  public FacebookAuth(): Promise<void> {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Sign in with Github
  public GithubAuth(): Promise<void> {
    return this.AuthLogin(new auth.GithubAuthProvider());
  }

  // Auth logic to run auth providers
  public AuthLogin(provider: any): Promise<void> {
    return this.afAuth.auth.signInWithPopup(provider).then((result) => {
      this.ngZone.run(() => {
        console.log('You have been successfully logged in!');
        console.log(result);
        this.SetUserData(result.user);
        this.router.navigate(['nadzorna-plosca']);
      });
    }).catch((error) => {
      window.alert(error);
      console.log('errorerrorerrorerrorerror');
    });
  }

  /* Setting up user data when sign in with username/password, sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  public SetUserData(user): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);
    const userData: FirebaseUserModel = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  public SignOut(): Promise<void> {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['prijava']);
      console.log('Logout successful');
    });
  }
}
