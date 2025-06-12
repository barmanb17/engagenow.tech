export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next(); 
    } catch (err) {
        console.error(err);
        return res.status(400).json({msg: err.errors[0].message});
    }
}