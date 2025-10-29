const { AboutService } = require('../services/index');
const CatchAsync = require('../utils/catchAsync');

// Get About page
const getAbout = CatchAsync(async (req, res) => {
    const result = await AboutService.getAbout();

    res.status(200).json({
        status: true,
        message: 'About page fetched successfully',
        data: result
    });
});

// Create or update About page
const createAbout = CatchAsync(async (req, res) => {
    const result = await AboutService.createAbout(req);

    res.status(201).json({
        status: true,
        message: 'About page created successfully',
        data: result
    });
});

// Update About page by ID (optional)
const updateAbout = CatchAsync(async (req, res) => {
    const result = await AboutService.updateAbout(req);

    res.status(200).json({
        status: true,
        message: 'About page updated successfully',
        data: result
    });
});

// Delete About page by ID
const deleteAbout = CatchAsync(async (req, res) => {
    const result = await AboutService.deleteAbout(req);

    res.status(200).json({
        status: true,
        message: 'About page deleted successfully',
        data: result
    });
});

module.exports = {
    getAbout,
    createAbout,
    updateAbout,
    deleteAbout
};
