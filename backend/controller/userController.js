import asyncHandler from "express-async-handler";
import Otp from "../models/otpModel.js";
// import generateToken from "../utils/generat.jseToken.js";
import User from "../models/userModel1.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { response } from "express";
import fetch from 'node-fetch';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    email send
// @route   POST /api/users/send-email
// @access  Public
const sendEmail = asyncHandler(async (req, res) => {
  let data = await User.findOne({ email: req.body.email });

  const response = {};

  if (data) {
    let otpCode = Math.floor(1000 + Math.random() * 9000);
    let otpData = new Otp({
      email: req.body.email,
      code: otpCode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    mailer(req.body.email, otpCode);
    res.json({ message: "Please check Your Email Id" });
  } else {
    res.status(404);
    throw new Error("Email Id not Exist");
  }
});

// @desc    change pwd
// @route   POST /api/users/change-password
// @access  Public
const changePwd = asyncHandler(async (req, res) => {
  let data = await Otp.findOne({
    email: req.body.email,
    code: req.body.otpCode,
  });

  const response = {};

  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      res.status(404);
      throw new Error("Token Expire");
    } else {
      let user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      user.save();
      res.json({ message: "Password change Successfully!!" });
    }
  } else {
    res.status(404);
    throw new Error("Invalid OTP");
  }
});

// @desc    Add Item in Wishlist
// @route   POST /api/users/wishlist
// @access  Private

const addWishList = asyncHandler(async (req, res) => {
  const { countInStock, name, image, price, product,rating,
    numReviews, } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    const alreadyInWishlist = user.wishlist.find((r) => r.product === product);

    if (alreadyInWishlist) {
      res.status(400);
      throw new Error("Item already In Wishlist");
    }

    const wishlist = {
      name,
      product,
      image,
      price,
      countInStock,
      rating,
      numReviews,
    };

    user.wishlist.push(wishlist);

    // product.numReviews = product.reviews.length;

    // product.rating =
    //   product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //   product.reviews.length;

    await user.save();
    res.status(201).json({ message: "Item Added To Wishlist" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const removeWishList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const alreadyInWishlist = user.wishlist.find(
      (r) => r._id.toString() === req.params.id.toString()
    );

    if (alreadyInWishlist) {
      user.wishlist.remove(alreadyInWishlist);
      await user.save();
      res.json({ message: "Item Remove From Wishlist" });
    } else {
      throw new Error("Item Not Found In Wishlist");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    get Wishlist Products
// @route   GET /api/users/wishlist
// @access  Private

const getWishlistProducts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user.wishlist);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    google login
// @route   POST /api/social_auth/google
// @access  Public
const client = new OAuth2Client(
  `${process.env.GOOGLE_CLIENT_ID}`
);
const googleLogin = asyncHandler(async (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
      `${process.env.GOOGLE_CLIENT_ID}`,
    })
    .then((response) => {
      const {  email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec(async (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Smething went wrong",
            });
          } else {
            if (user) {
              res.json({ 
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
              });
            } else {
              let password = email+process.env.JWT_SECRET
              const user = await User.create({
                name,
                email,
                password
              });

              if (user) {
                res.status(201).json({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  token: generateToken(user._id),
                });
              } else {
                res.status(400);
                throw new Error("Invalid user data");
              }
            }
          }
        });


      }
      //  console.log(res.payload)
    })
    .catch((err) => {
      console.log(err);
    });
});

const fbLogin = asyncHandler(async (req, res) => {
  const { accessToken,userID} = req.body;

 let urlgrahpfb = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`

 fetch(urlgrahpfb,{
   method:'GET'
 }).then(response => response.json()).then( response=>{
   const {email,name} = response;
   console.log(response);
   User.findOne({ email }).exec(async (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Smething went wrong",
      });
    } else {
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        let password = email+process.env.JWT_SECRET
        const user = await User.create({
          name,
          email,
          password
        });

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
        } else {
          res.status(400);
          throw new Error("Invalid user data");
        }
      }
    }
  });

 })


})

const mailer = (email, otp) => {
  const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "reactjsdeveloper45@gmail.com",
      pass: `${process.env.PASS}`,
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log("Ready to Send");
    }
  });

  var mail = {
    from: "reactjsdeveloper45@gmail.com",
    to: email,
    subject: "One Time Password | TEAM SPEED",
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title></title>
        <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    
    <body>
        <div class="es-wrapper-color">
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#fafafa"></v:fill>
                </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure" align="left" bgcolor="#1976D2" style="background-color: #1976d2;">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                            <a target="_blank"><img class="adapt-img" src="https://demo.stripocdn.email/content/guids/videoImgGuid/images/char_pahiya2_FNa.png" alt style="display: block;" width="265"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" style="background-color: #fafafa;" bgcolor="#fafafa" align="center">
                                            <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p40t es-p20r es-p20l" style="background-color: transparent; background-position: left top;" bgcolor="transparent" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-image es-p40t es-p40b" align="center" style="font-size:0">
                                                                                            <a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt style="display: block;" width="139"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p15t es-p25b" align="center">
                                                                                            <h1 style="color: #333333; font-size: 20px;"><strong>FORGOT YOUR </strong></h1>
                                                                                            <h1 style="color: #333333; font-size: 20px;"><strong>&nbsp;PASSWORD?</strong></h1>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p10b es-p40r es-p40l" align="center">
                                                                                            <p style="font-size: 18px;">HI,&nbsp;${email}</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p10t es-p5b es-p35r es-p40l" align="center">
                                                                                            <p style="font-size: 16px;">We understand you have many things to remember and forgetting a password is obvious&nbsp;😁.</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p25t es-p40r es-p40l" align="center">
                                                                                            <p><span style="font-size:16px;">You need not worry. Eager to see you on Char Pahiya😎&nbsp;.</span><br><br><br><em><strong><span style="font-size:17px;">Enter the OTP provided below.</span></strong></em></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-button es-p40t es-p40b es-p10r es-p10l" align="center"><span class="es-button-border-1649509971724 es-button-border" style="border-radius: 9px; border-width: 6px; display: block; background: #ffffff; border-color: #0b5394;"><a  class="es-button es-button-1649509971716" target="_blank" style="border-radius: 9px; font-size: 18px; font-weight: bold; font-style: italic; border-left-width: 5px; border-right-width: 5px; display: block; color: #333333;">${otp}</a></span></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="esd-structure es-p5t es-p20b es-p20r es-p20l" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-text" esd-links-color="#666666" align="center">
                                                                                            <p style="font-size: 14px;">Contact us: <a target="_blank" style="font-size: 14px; color: #666666;" href="tel:123456789">123456789</a> | <a target="_blank" href="mailto:reactjsdeveloper45@mail.com" style="font-size: 14px; color: #666666;">reactjsdeveloper45@gmail.com</a></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    
    </html>
            `,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
  //
  // mailOptions = {
  //   to: email,
  //   subject: "We Have Received Your Message",
  //   html: `
  //   Hello
  //   Thanks for sending us a message! We’ll get back to you as soon as possible.`
  // };
  // contactEmail.sendMail(mailOptions);
  // //
};

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendEmail,
  changePwd,
  addWishList,
  removeWishList,
  getWishlistProducts,
  googleLogin,
  fbLogin
};
