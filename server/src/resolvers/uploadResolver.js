const {readFile, multipleReadFile} = require("../middleware/file");
const {SingleFile} = require("../models/singleUploadModel");
const {MultipleFile} = require("../models/multipleUpload");

const uoloadResolver = {
    Query: {
        greetings: () => {
            return "Hello World"
        }
    },
    Mutation: {
        singleUpload: async (_, {file}) => {
            const imageUrl = await readFile(file);
            const singlefile = new SingleFile({image: imageUrl});
            await singlefile.save();
            return {
                message: "Single file uploaded successfully!"
            }
        },
        multipleUpload: async (_, {file}) => {
            const imageUrl = await multipleReadFile(file);
            const multiplefile = new MultipleFile();
            multiplefile.images.push(...imageUrl);
            multiplefile.save();
            return {
                message: "Multiple Files uploaded successfully!"
            }
        }
    }
} 

module.exports = uoloadResolver