export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: `${process.env.NEXT_PUBLIC_FB_ID}`,
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });
    };
    resolve();
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};
export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login((response) => {
      resolve(response);
    });
  });
};
