const About = require('../models/about');
const AppError = require('../utils/AppError');

// Get the about page content
const getAbout = async () => {
   
    const about = await About.findOne();
    return about;
}

// Create or update About page
const createAbout = async (req) => {
    const { aboutPage } = req.body;


    let about = await About.findOne();

    if (about) throw new AppError('Already about page created',409)
    
    about = await About.create({ aboutPage });
    

    return about;
}

// Update About page (by ID, optional if you want multiple about pages)
const updateAbout = async (req) => {
    const { aboutId } = req.params;
    const { aboutPage } = req.body;

    const updatedAbout = await About.findByIdAndUpdate(
        aboutId,
        { $set: { aboutPage } },
        { new: true }
    );

    if (!updatedAbout) throw new AppError('About page not found', 404);

    return updatedAbout;
}

// Delete About page
const deleteAbout = async (req) => {
    const { aboutId } = req.params;

    const deletedAbout = await About.findByIdAndDelete(aboutId);

    if (!deletedAbout) throw new AppError('About page not found', 404);

    return deletedAbout;
}

module.exports = {
    getAbout,
    createAbout,
    updateAbout,
    deleteAbout
};
