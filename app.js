const express = require(`express`);
const app = express();
const FSchema = require(`./FSchema`);
let DataUpload;

const mongoose = require(`mongoose`);
mongoose.connect(`mongodb://127.0.0.1:27017/FruitDatabase`);

app.listen(3000, console.log(`server running on 3000`));
app.use(express.urlencoded({ extended: true }));

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

app.post(`/`, (req, res) => {
  DataUpload = new FSchema({
    Name: req.body.FName,
    Type: req.body.FType,
    Description: req.body.FDesc,
  });
  UploadToDB().then(() => {
    FindinDB().then(() => {
      LoopThrough().then(() => {
        console.log(`all 3 functions ran`);
      });
    });
  });
  res.redirect(`/`);
});

const UploadToDB = async () => {
  await FSchema.insertMany(DataUpload);
  //console.log(Items);
};

const FindinDB = async () => {
  let foundItems = await FSchema.find();
  //console.log(foundItems);
};

const LoopThrough = async () => {
  let ToLoop = await FSchema.find();
  ToLoop.forEach((Item) => {
    console.log(
      `Name is : ${Item.Name} and Desciption is : ${Item.Description}`
    );
  });
};

const execution = async () => {
  await UploadToDB();
  await FindinDB();
  await LoopThrough();
};
