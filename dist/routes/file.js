var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import axios from "axios";
const router = express.Router();
// @route    GET file/
// @desc     Retrieve the value for the given key if it exists and has not expired. Otherwise, return null.
// @access   Private
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("here", req.query);
        const { query, type } = req.query;
        const resData = yield axios.get(`http://rapidtags.io/api/generator?query=${query}&type=${type}`);
        if (resData.status === 200) {
            res.status(200).send(resData.data);
        }
        else {
            res.status(resData.status).send(resData.statusText);
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
export default router;
//# sourceMappingURL=file.js.map