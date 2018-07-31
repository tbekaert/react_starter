/* eslint-disable */

export default {
  form: {
    username: {
      login: ['Login', 'Matricule'],
      reset: ['Login', 'Matricule'],
      placeholder: ['You can type anything here', 'Vous pouvez taper n\'importe quoi ici']
    },
    password: {
      login: ['Password', 'Mot de passe'],
      new: ['New password', 'Nouveau mot de passe'],
      placeholder: ['You can type anything here', 'Vous pouvez taper n\'importe quoi ici']
    }
  },
  lostPassword: ['Lost password ?', 'Mot de passe oublié ?'],
  submit: {
    login: ['Login', 'Connexion'],
    reset: ['Reset password', 'Réinitialiser le mot de passe'],
    new: ['Update my password', 'Changer mon mot de passe']
  },
  success: {
    new: [
      'Your password is now updated. Please login again.',
      'Votre mot de passe a été mis à jour. Veuillez vous reconnecter.'
    ],
    reset: [
      'A link to reset your password has been sent to you.',
      'Un lien de réinitialisation de mot de passe vous a été envoyé.'
    ]
  },
  error: {
    unauthorized: [
      'Your login or password is incorrect',
      'Votre identifiant ou mot de passe est éronné'
    ],
    error: [
      'There was an error. Please, try again later.',
      'Une erreur est survenue, veuillez essayer plus tard.'
    ]
  },
  backToLogin: {
    reset: [
      'Go back to login page',
      'Revenir à la page de connexion'
    ],
    new: [
      'Go back to login page',
      'Revenir à la page de connexion'
    ]
  }
};