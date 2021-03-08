function getUserIdFromAuthenticatedRequest(req) {
    if (req.userId) {
        return req.userId;
    }
    return req.userContext && req.userContext.userinfo && req.userContext.userinfo.sub;
}