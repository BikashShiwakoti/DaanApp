const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const UserData = require('./Models/userModel');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const UserProfile = require('./Models/UserProfile');
const userItemData = require('./Models/itemModel');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin:["http://localhost:3000"],
  methods:["POST","GET", "PUT"],
  credentials:true

}));

// Configure multer for file uploads
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 } 
});

mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Database connected ");

    const port = process.env.PORT || 2400;
    
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(error => {
    console.log("ERROR CONNECTING DATABASE", error);
  });

app.post('/signup', async (req, res) => {
  const { fullname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserData.findOne({ email });

  if (user) {
    res.status(500).send("Email already exists. Try another!!");
    return;
  }

  const newUser = new UserData({
    fullname,
    email,
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    console.log("Received user data ", savedUser);
    res.status(200).send("Received and saved user data successfully");
  } catch (error) {
    console.log("Error saving user data:", error);
    res.status(500).send("Cannot store user data");
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await UserData.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY);

    res.status(200).json({accessToken:accessToken, message:'Login Successful'});
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send('Error logging in: ' + error.message);
  }
});



app.get('/dashboard',authorizeToken, (req, res)=>{
  
})

app.get('/profile', authorizeToken, (req, res) =>{

})

app.put('/saveUserProfile',authorizeToken, upload.single('profileImage'), async (req, res) => {
  const { contactNumber, address } = req.body;
  const userId = req.user._id;

  
  try {
      if (!req.file) {
          return res.status(400).send('No file uploaded.');
      }

      const profileImageBuffer = req.file.buffer;

      const updatedProfile = await UserProfile.findOneAndUpdate(
        { userId: userId },
        {
          
          profileImage: {
            data: profileImageBuffer,
            contentType: req.file.mimetype,
          },
          contactNumber,
          address,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log("Profile updated: ", updatedProfile);
      res.status(200).send("Profile data updated successfully");
    } catch (error) {
      console.error('Error saving profile:', error); // Log the detailed error
      res.status(500).send('Cannot store data');
  }
});


app.get('/getprofiledata', authorizeToken, async (req, res) => {
  try {
    const userId = req.user._id; 
    const userProfile = await UserProfile.findOne({ userId: userId });
    const userName = await UserData.findById(userId);

    if (userProfile) {
      const { profileImage, ...userData } = userProfile.toObject();
      const username = userName ? userName.fullname: ''; // Extract username

      if (profileImage && profileImage.data) {
        const { data, contentType } = profileImage;
        res.status(200).send({ ...userData, username, profileImageData: { data, contentType } });
      } else {
        res.status(200).send({ ...userData,username, profileImageData: null }); // If no image data found
      }
    } else {
      res.status(404).send('No user data found');
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).send('Error fetching profile data');
  }
});

app.post('/saveItemData',authorizeToken, upload.single('itemPhoto'), async(req, res) => {
 
    const {description} = req.body;
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
    const itemImageBuffer = req.file.buffer;

    const itemData = new userItemData({
      itemImage: {
        data: itemImageBuffer,
        contentType: req.file.mimetype,
      },
      description,
      userId
    })
    try {
    const saveItemData = itemData.save();
    console.log("saved ", saveItemData);
    res.status(200).send("Item data saved successfully.");

  } catch (error) {
    console.log('could not save item data');
    res.status(500).send("could not save item data")
  }
});


app.get('/getItemData', authorizeToken, async (req, res) => {
  try {
    const items = await userItemData.find();

    if (items.length > 0) {
      const formattedItems = items.map(item => {
        const { itemImage, ...itemData } = item.toObject();
        if (itemImage && itemImage.data) {
          const { data, contentType } = itemImage;
          return { ...itemData, itemImageData: { data, contentType } };
        } else {
          return itemData;
        }
      });

      res.status(200).json(formattedItems); // Send the response after mapping is complete

    } else {
      res.status(404).send('No items found');
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});


// app.get('/getItemData', authorizeToken, async (req, res) => {
//   try {
//     const items = await userItemData.find();

//     if (items.length > 0) {
//       const formattedItems = items.map(item => {
//         const { itemImage, ...itemData } = item.toObject();
        
//         if (itemImage) {
//           return { ...itemData, itemImage: { data: itemData.itemImage.data, contentType: itemData.itemImage.contentType } };
//         } 
//       });

//       res.status(200).json(formattedItems);
//     } else {
//       res.status(404).send('No items found');
//     }
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).send('Error fetching items');
//   }
// });


function authorizeToken(req, res, next){
  const authHeader = req.header('authorization');
  if(typeof authHeader !== 'undefined'){
    const [bearer, accessToken] = authHeader.split(' ');
    if(bearer !== 'Bearer' && !accessToken) 
      return res.status(401).send("Token format is not correct");

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if(err){
        res.status(403).send('Token is not valid');
      } else{
        req.user = user;
        next();
      }
    });
  } else{
    res.status(401).send('Token not provided');
  }
}
