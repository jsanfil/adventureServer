'use strict';

var multer  = require('multer'),
    multerS3 = require('multer-s3'),
    appRoot = require('app-root-path'),
    logger = require(appRoot+'/config/winston.js'),
    AWS = require('aws-sdk');

let s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
  });
const bucketName = process.env.S3_BUCKETNAME;

//Create bucket. Note: bucket name must be unique.
//Requires only bucketName via post 
//check [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property](http://) for more info
exports.createBucket = function (req, res) {
    var item = req.body;
    var params = { Bucket: item.bucketName };
    s3.createBucket(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//List all buckets owned by the authenticate sender of the request. Note: bucket name must be unique.
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listBuckets-property for more info
exports.listBuckets = function (req, res) {
    s3.listBuckets({}, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//Delete bucket.
//Require bucketName via delete 
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucket-property for more info
exports.deleteBucket = function (req, res) {
    var item = req.body;
    var params = { Bucket: item.bucketName };
    s3.deleteBucket(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//Delete bucket cors configuration. 
// Requires bucketName via delete
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucketCors-property for more info
exports.deleteBucketCors = function (req, res) {
    var item = req.body;
    var params = { Bucket: item.bucketName };
    s3.deleteBucketCors(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//List objects in a bucket from Amazon s3
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property to configure params properties
//eg var params = {Bucket: 'bucketname', Key:'keyname'}
exports.listObjects = function (req, res) {
    var item = req.body;
    var params = {Bucket: bucketName };
    s3.listObjectsV2(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}
//Retrieves objects from Amazon s3
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property to configure params properties
//eg var params = {Bucket: 'bucketname', Key:'keyname'}
exports.getObject = function (req, res) {
    var item = req.body;
    var params = { Bucket: bucketName, Key: req.params.key };
    s3.getObject(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        console.log(data)
        res.set({
            'Content-Type': data.ContentType,
            'Content-Length': data.ContentLength,
            'ETag': data.ETag,
            'Accept-Ranges': data.AcceptRanges,
            'Last-Modified': data.LastModified,
          })
        res.send(data.Body);
    });
}

//Delete qn object
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property for more info
exports.deleteObject = function (req, res) {
    var item = req.body;
    var params = { Bucket: item.bucketName, Key: item.key };
    s3.deleteObject(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//cloud image uploader using multer-s3 
//Pass the bucket name to the bucketName param to upload the file to the bucket
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
})

exports.singleMulterUpload = upload.single('image');

exports.uploadFile = function (req, res, next) {    
    res.json({ message: 'Image successfully uploaded' });
}
