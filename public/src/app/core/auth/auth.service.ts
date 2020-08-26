import { Injectable, NgZone } from '@angular/core';
import { FirebaseUserModel } from '../user/user.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirebaseAuthService {

  public currentUserData: any;
  public isUserLoggedIn: boolean;
  public userLocalStorage = JSON.parse(localStorage.getItem('user'));
  public userOnlyName: string;
  public userFullName: string;
  public userId: string;
  public userEmail: string;

  public user$: Observable<FirebaseUserModel>;

  constructor(
    public firestore: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user'));
          this.isUserLoggedIn = true;
          this.currentUserData = JSON.parse(localStorage.getItem('user'));
          this.userOnlyName = this.getShortName(user.displayName);
          this.userFullName = user.displayName;
          this.userEmail = user.providerData[0].email;
          this.userId = user.uid;
          return this.firestore.doc<FirebaseUserModel>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
          this.isUserLoggedIn = false;
          this.currentUserData = null;
          this.userOnlyName = null;
          this.userFullName = null;
          this.userEmail = null;
          this.userId = null;
          return of(null);
        }
      })
    );
  }

  private getShortName(fullName: string) {
    return fullName.split(' ').slice(0, -1).join(' ');
  }

  // Sign in with email/password
  public EmailSignIn(email: string, password: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['pregled']);
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
  public get isLoggedIn(): boolean {
    return this.userLocalStorage !== null ? true : false;
  }

  // Returns true when user is logged in and email is verified
  get getUserData(): any {
    return JSON.parse(localStorage.getItem('user'));
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
  public async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  // Sign in with Facebook
  public async facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  // Sign in with Twitter
  public async twitterSignIn() {
    const provider = new auth.TwitterAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  // Sign in with Github
  public async githubSignIn(): Promise<void> {
    const provider = new auth.GithubAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
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
        this.SetUserData(result.user);
        this.router.navigate(['pregled']);
      });
    }).catch((error) => {
      window.alert(error);
      console.log('Error!');
    });
  }

  /* Setting up user data when sign in with username/password, sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  public SetUserData(user): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`user/${user.uid}`);
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

  private updateUserData(user: any): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<FirebaseUserModel> = this.firestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    this.ngZone.run(() => {
      console.log('You have been successfully logged in!');
      this.router.navigate(['/pregled']);
    });

    return userRef.set(data, { merge: true });
  }

  // Sign out
  public async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['']);
    console.log('Logout successful');
  }
}
