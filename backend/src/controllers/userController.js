import { UserService } from "../services/index.js";

export async function postRegisterUserCtrl(req, res) {
  try {
    const userInfo = req.body;
    const result = await UserService.registerUser(userInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message });
  }
}

export async function postLoginUserCtrl(req, res) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await UserService.loginUser(userInfo);
    if (result.tokens.refreshToken) {
      req.session.refreshToken = result.tokens.refreshToken; // refresh token in http only cookie session speichern
    }

    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message });
  }
}

async function postRefreshToken(req, res) {
  try {
    const result = await UserService.refreshToken(req.authenticatedUserId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not register" });
  }
}

export async function postVerifyEmailCtrl(req, res) {
  try {
    const userId = req.params.userId;
    const sixDigitCode = req.body.sixDigitCode;
    const result = await UserService.verifyUserEmail({
      userId,
      sixDigitCode,
    });
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message });
  }
}

async function deleteUserCtrl(req, res) {
  try {
    const authenticatedUserId = req.authenticatedUserId;
    const result = await UserService.deleteUser({
      userId: authenticatedUserId,
    });
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not register" });
  }
}

export async function getUserByIdCtrl(req, res) {
  try {
    const authenticatedUserId = req.authenticatedUserId;
    const user = await UserService.getUserById({
      userId: authenticatedUserId,
    });
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not get user" });
  }
}

export async function patchUpdateUserCtrl(req, res) {
  try {
    const authenticatedUserId = req.authenticatedUserId;
    const updateData = req.body;

    const updatedUser = await UserService.updateUser({
      userId: authenticatedUserId,
      updateData,
    });

    res.json({ user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function handleLogout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
}

export const UserController = {
  postRegisterUserCtrl,
  postLoginUserCtrl,
  postRefreshToken,
  postVerifyEmailCtrl,
  deleteUserCtrl,
  getUserByIdCtrl,
  patchUpdateUserCtrl,
  handleLogout,
};
