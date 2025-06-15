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




