export default async (req, res, next) => {
    req.body.status = 'completed';
    next(); // Passa al prossimo middleware o controller
};