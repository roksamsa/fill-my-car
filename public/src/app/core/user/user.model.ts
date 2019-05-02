export class FirebaseUserModel {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;

  constructor() {
    this.uid = '';
    this.email = '';
    this.displayName = '';
    this.photoURL = '';
    this.emailVerified = false;
  }
}
