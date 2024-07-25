import express from "express";
import {filterImageFromURL, deleteLocalFiles} from '../util/util.js';
export const router = express.Router();

// Get tweet by id
router.get( "/", async ( req, res ) => {
  const image_url = req.query.image_url;

  if (!image_url) {
    const current_path = req.get('host') + req.path;
    res.status(400).send(`You should include image_url param on query:    <code><b>${current_path}?image_url={{URL}}</b></code><br>
      This image_url need to be encoded`)
    return;
  }

  const validUrl = URL.canParse(image_url);
  if (!validUrl) {
    res.status(400).send(`image_url param should be a valid url and need to be encoded`)
    return;
  }

  try {
    const outpath = await filterImageFromURL(image_url);
    console.log('image_url: ' + image_url);
    console.log("output path: ", outpath)

    res.status(200).sendFile(outpath, err => {
      if (err) {
          console.log("Cannot send the file to client. Error: ",err);
          res.sendStatus(500);
      }
      deleteLocalFiles([outpath]);
   });
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).send(`Cannot get image from url`)
  }
} );
