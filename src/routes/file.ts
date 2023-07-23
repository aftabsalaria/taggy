import express from "express";
import axios from "axios"

const router = express.Router();

// @route    GET file/
// @desc     Retrieve the value for the given key if it exists and has not expired. Otherwise, return null.
// @access   Private
router.get("/", async (req, res) => {
  try {
    console.log("here", req.query)
    const {query, type} = req.query;
    const resData = await axios.get(`http://rapidtags.io/api/generator?query=${query}&type=${type}`);
    if(resData.status === 200){
      res.status(200).send(resData.data);
    } else {
      res.status(resData.status).send(resData.statusText)
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
