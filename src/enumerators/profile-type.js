const ProfileType = {
  ADMIN: 1, // Super admin (can fully manipulate the system)
  MANAGER: 2, // Admin manager (can create, update, read and delete events)
  USER: 3, // Generic
};

export default ProfileType;