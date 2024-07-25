import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { requiresAuth } from './middleware/requiresAuthMiddleware.js';
import { router as filterImageRoutes } from './routes/filterImageRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  app.use(cors())
  app.use("/auth", authRoutes)
  app.use("/filteredimage", requiresAuth(), filterImageRoutes);
  // app.use("/filteredimage", filterImageRoutes)

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  // app.get( "/filteredimage-old", async (req, res) => {
  //   const image_url = req.query.image_url;
 
  //   if (!image_url) {
  //     const current_path = req.get('host') + req.path;
  //     res.status(400).send(`You should include image_url param on query:    <code><b>${current_path}?image_url={{URL}}</b></code><br>
  //       This image_url need to be encoded`)
  //     return;
  //   }
 
  //   const validUrl = URL.canParse(image_url);
  //   if (!validUrl) {
  //     res.status(400).send(`image_url param should be a valid url and need to be encoded`)
  //     return;
  //   }
 
  //   try {
  //     const outpath = await filterImageFromURL(image_url);
  //     console.log('image_url: ' + image_url);
  //     console.log("output path: ", outpath)
 
  //     res.status(200).sendFile(outpath, err => {
  //       if (err) {
  //           console.log("Cannot send the file to client. Error: ",err);
  //           res.sendStatus(500);
  //       }
  //       deleteLocalFiles([outpath]);
  //    });
  //   } catch (error) {
  //     console.log("Error: ", error)
  //     res.status(500).send(`Cannot get image from url`)
  //   }
  // });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
