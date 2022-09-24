const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

export const upload = async (req, res) => {
  try {
    const { image, folder } = req.body.input;
    // let secure_urls = "";
    // console.log(image);
    // console.log(folder);
    let urls = "";

    let data = await cloudinary.uploader.upload(image, {
      unique_filename: true,
      discard_original_filename: true,
      folder: folder,
      timeout: 120000,
    });

    // secure_urls = data.secure_url;

    urls = data.url;

    // console.log(urls);

    // success
    return res.json({
      path: data.url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Error Uploading Files",
    });
  }
  //     // let imageBuffer = Buffer.from(base64str, 'base64');

  //     // // upload the file to somewhere( s3 or google Cloud)
  //     // fs.writeFileSync("../../../assets/images/foods" + name, imageBuffer, 'base64')
};
