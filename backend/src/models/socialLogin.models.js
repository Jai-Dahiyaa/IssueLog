import pool from '../db/db.js';

export const socialLogin = async (user_id, platform, platformUserId) => {
  const res = await pool.query(
    `INSERT INTO social_login (user_id, platform_name,  platform_user_id) VALUES ($1, $2, $3) RETURNING *`,
    [user_id, platform, platformUserId]
  );
  return res.rows[0];
};

export const updateSocialLogin = async (platform, platformUserId, user_id) => {
  const res = await pool.query(
    `UPDATE social_login SET platform_name = $1, platform_user_id = $2 WHERE user_id = $3 RETURNING *`,
    [platform, platformUserId, user_id]
  );
  return res.rows[0];
};
