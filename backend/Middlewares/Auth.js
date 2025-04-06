const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];

    if (!auth) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized: JWT token is required",
            code: "MISSING_TOKEN"
        });
    }

    // Split the token if it's in "Bearer <token>" format
    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : auth;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Basic token validation
        if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Token expired",
                code: "TOKEN_EXPIRED"
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        let message = "Unauthorized: Invalid JWT token";
        
        if (error.name === 'TokenExpiredError') {
            message = "Unauthorized: JWT token expired";
        } else if (error.name === 'JsonWebTokenError') {
            message = "Unauthorized: Malformed JWT token";
        }

        return res.status(403).json({
            success: false,
            message: message,
            code: "INVALID_TOKEN",
            error: error.name
        });
    }
};

module.exports = ensureAuthenticated;