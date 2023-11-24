export const roleMiddleware = (isAdmin) => {
  return (req, res, next) => {
    const userRole = req.user.is_admin;

    if (userRole == true && isAdmin == true) {
      next();
    } else {
      res.status(403).json({
        code: 403,
        errors: 'Forbidden'
      });
    }

  }
}