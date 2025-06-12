import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const {title, description, status, dueDate} = req.body;

        const newProject = await Project.create({
            title,
            description,
            status,
            dueDate,
            clientId: req.send.userId,
        });

        res.status(201).json({project: newProject});
    } catch (err){
        console.error(err);
        res.status(500).json({msg:"Failed to create project"});
    }
};





export const getClientProjects = async (req, res) => {
    try {
        const clientId = req.user.userId;

        const projects = await Project.find({clientId});

        res.status(200).json({projects});
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Something went wrong"});
    }
};