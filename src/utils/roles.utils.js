// Roles
const USER_ROLE = 'USER_ROLE';
const CRITIC_ROLE = 'CRITIC_ROLE';
const ADMIN_ROLE = 'ADMIN_ROLE';

const DEFAULT_ROLES = {
    [USER_ROLE]: 1,
    [CRITIC_ROLE]: 2,
    [ADMIN_ROLE]: 3,
};

const DEFAULT_ROLES_ARRAY = [
    DEFAULT_ROLES.USER_ROLE,
    DEFAULT_ROLES.CRITIC_ROLE,
    DEFAULT_ROLES.ADMIN_ROLE,
];

Object.freeze(DEFAULT_ROLES);

export { USER_ROLE, CRITIC_ROLE, ADMIN_ROLE, DEFAULT_ROLES, DEFAULT_ROLES_ARRAY };
