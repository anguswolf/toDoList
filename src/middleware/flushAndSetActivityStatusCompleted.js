export default async (req, res, next) => {
    req.body = {}
    req.body.status = 'completed';
    next(); // Passa al prossimo middleware o controller
};