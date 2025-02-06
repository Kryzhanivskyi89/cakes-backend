const { ctrlWrapper } = require("../../helpers");

const syncGallery = require("./syncGallery");
const getCategory = require("./getCategory");

module.exports = {
    syncGallery: ctrlWrapper(syncGallery),
    getCategory: ctrlWrapper(getCategory),
};
