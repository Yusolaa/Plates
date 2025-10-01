import express from "express";
import { sigInWithGoogle, getProfile } from "../controllers/ovController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/auth/google-signin", sigInWithGoogle);
router.get("/profile", authenticate, getProfile);

export default router;
