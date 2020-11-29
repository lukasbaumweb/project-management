const ERROR_CODES = {
  'auth/invalid-email': 'Die E-Mail ist ungültig',
  'auth/wrong-password': 'Passwort oder E-Mail falsch',
  'auth/user-not-found': 'Kein Benutzer mit dieser E-Mail vorhanden',
  'auth/too-many-requests':
    'Der Zugriff auf dieses Konto wurde aufgrund vieler fehlgeschlagener Anmeldeversuche vorübergehend deaktiviert. Sie können es sofort wiederherstellen, indem Sie Ihr Passwort zurücksetzen, oder Sie können es später erneut versuchen.',
  'auth/requires-recent-login':
    'Dieser Vorgang ist vertraulich und erfordert eine kürzlich erfolgte Authentifizierung. Melden Sie sich erneut an, bevor Sie diese Anforderung erneut versuchen.',
};
export default ERROR_CODES;
