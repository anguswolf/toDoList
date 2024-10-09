export default (user) => {
    const out = {
      email: user.email,
      displayName: user.displayName,
    }
    if(user.accessToken) {
      out.accessToken = user.accessToken;
      out.refreshToken = user.refreshToken;
    }
    return out
  }