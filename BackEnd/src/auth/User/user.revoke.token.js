import jwt from "jsonwebtoken";

const userTokenBlacklist = new Set();

const clearUserExpiredTokens = () => {
  console.log(`Revoke tokens initiated...`);
  console.log(`Antes: `, userTokenBlacklist);
  const now = Date.now();
  for (const token of userTokenBlacklist) {
    const decodedToken = jwt.decode(token);
    if (decodedToken && decodedToken.exp * 1000 < now) {
      userTokenBlacklist.delete(token);
    }
  }
  console.log(`Depois: `, userTokenBlacklist);
  console.log("Tokens revoked successfully");
};

export { userTokenBlacklist, clearUserExpiredTokens };