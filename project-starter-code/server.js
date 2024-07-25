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
