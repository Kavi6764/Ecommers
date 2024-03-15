const express = require ("express");

const app= express();

const jwt = require ("jsonwebtoken");

const cors = require ("cors");

const path = require ('path');

const mongoose=require("mongoose");

const  configDotenv  = require("dotenv");

const multer= require ('multer');


const port = process.env.PORT || 9000;

configDotenv.config();

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },()=>{
    console.log('DB Conneciong')
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/image');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint image storage
app.use('/image', express.static('upload/image'));

// Api Upload Image
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/image/${req.file.filename}`
    });
});
//SCHEMAis
const User = mongoose.model('Product', new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}));
//api upload products
app.post('/addproducts', async (req, res) => {
    let products = await User.find({});
    let id;
    if(products.length > 0)
    {
            let last_product_array=products.slice(-1);
            let last_product = last_product_array[0];
            id=last_product.id+1;
    }
    else
    {
        id=1;
    }
    const user = new User({
        id:id,
        name: req.body.name,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price, 
        image: req.body.image,


    });

    try {
        await user.save();
        console.log(user);
        console.log('saved');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to save user'
        });
    }
});
// Creating API for deleting products

app.post('/removeproduct',async(req,res)=>{
        await User.findOneAndDelete({
        id:req.body.id
      });
      console.log("removed");
      res.json({
        success:true,
        name:req.body.name
      })
})

app.get('/post',(req,res)=>{
    res.send("server running")
})

// Creating API for getting all products
  app.get('/allproducts',async (req,res)=>{
    try{
         let allproducts= await User.find({});
         res.json(allproducts);
         console.log(allproducts);
    }   
   catch (err){
      res.status(500).send(err.message);
   }
  })
 // Schema Creating For User model

 const Users = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },
    date: {
        type: Date,
        default: Date.now,
    }
}));

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "existing user found with same Email Address"
        })
       
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
});
//Creating Endpoint for User Login

  app.post('/login',async (req,res)=>{
    let users = await Users.findOne({email:req.body.email});
    if(users){
            const passcompare =req.body.password === users.password;
            if(passcompare){
                const data = 
                 {
                    users:{
                        id:users.id
                    }
                }
                const token = jwt.sign(data,'secret_ecom');
                res.json({ success:true,token  })
                }
            else{
                res.json({
                    success:false,
                    error:"wrong Password"
                })
            }
    }
else{
     res.json({
        success:false,
        error:"wrong Email id",
     })
    }
  })
 
 // Creating Endpointfor newcollection

  app.get('/newcollections',async (req,res)=>{
        let Products = await User.find({});
        let newcollection = Products.slice(1).slice(-8);
        console.log("new collection fetched");
        res.send(newcollection)
  })

  // Creating  endpoint for popular in woman section

  app.get('/popularinwoman',async (req,res)=>{
     let Products = await User.find({category:"women"});
     let popularinwoman =Products.slice(0,4);
     console.log("popular women in fetched");
     res.send(popularinwoman);

  })

// Authentication middleware
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
  
    if (!token) {
      return res.status(401).send({ error: 'Please Authentication using valid token' });
    }
  
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.users = data.users;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authentication using valid token' });
    }
  };
  
  // creating endpoint for addtocart 
  app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added",req.body.itemId)
    const userData = await Users.findOne({ _id: req.users.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.users.id }, { cartData: userData.cartData });
    res.send('Added');
  });
    // creating endpoint for removefromcart 
  app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed",req.body.itemId)
    const userData = await Users.findOne({ _id: req.users.id });
      if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
      await Users.findOneAndUpdate({ _id: req.users.id }, { cartData: userData.cartData });
    }
    res.send('Removed');
  });
  
  // Creating endponi to get cart
  app.post('/getcart',fetchUser ,async(req,res)=>{
              console.log('get cart');
              let userData = await Users.findOne({_id:req.users.id});
              res.json(userData.cartData)
  })
app.listen(port,()=>{
    console.log("Port connecting")
})