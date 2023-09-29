// export const loadFacebookSDK = () => {
//   const script = document.createElement("script");
//   script.src = "https://connect.facebook.net/en_US/sdk.js";
//   script.async = false; // Load synchronously
//   document.head.appendChild(script);
// };

export function loadFacebookSDK() {
  if (document.getElementById("facebook-jssdk")) {
    return;
  }
  const script = document.createElement("script");
  script.src = "https://connect.facebook.net/en_US/sdk.js";
  script.async = true;
  script.id = "facebook-jssdk";
  script.onload = function () {
    console.log("Facebook SDK loaded.");
    initFacebookSdk();
  };
  document.head.appendChild(script);
}

export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: `${process.env.NEXT_PUBLIC_FB_ID}`,
        cookie: true,
        autoLogAppEvents: true,
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

export const fbLogout = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus((response) => {
      console.log(response);
      if (response.status === "connected") {
        FB.logout(function (response) {
          console.log(response);
        });
        resolve(response);
      }
    });
  });
};
