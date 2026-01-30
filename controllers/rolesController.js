import {
  fetchAllRoles,
  fetchRoleById,
  updateRoleById
} from "../models/roles.js";

export const roles = async (req, res) => {
  try {
    const { flagId, roleId, ...data } = req.body || {};

    if (!flagId) {
      return res.status(400).json({
        success: false,
        message: "flagId is required"
      });
    }

    let result;

    // Get all roles
    if (Number(flagId) === 1) {
      result = await fetchAllRoles();
      return res.status(200).json({ success: true, data: result });
    }

    // Get role by ID
    if (Number(flagId) === 2) {
      if (!roleId) {
        return res.status(400).json({ success: false, message: "roleId required" });
      }

      result = await fetchRoleById(roleId);
      if (!result) {
        return res.status(404).json({ success: false, message: "Role not found" });
      }

      return res.status(200).json({ success: true, data: result });
    }

    // Update role
    if (Number(flagId) === 3) {
      if (!roleId) {
        return res.status(400).json({ success: false, message: "roleId required" });
      }

      result = await updateRoleById(roleId, data);
      if (!result) {
        return res.status(404).json({ success: false, message: "Role not found" });
      }

      return res.status(200).json({ success: true, data: result });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid flagId"
    });

  } catch (err) {
    console.error("Get Roles err:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
