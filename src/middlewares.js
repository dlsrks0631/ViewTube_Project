import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {}; // 현재 로그인된 사용자가 누구인지 알려줌
  next();
};

// 로그인 돼 있지 않으면 멈추게 함
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
};

// 로그인 돼 있으면 멈추게 함
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

// 사용자가 보낸 파일을 uploads 폴더에 저장하도록 설정된 middleware
export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: {
    fileSize: 30000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});
