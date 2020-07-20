const UserEntity = require('../models/user');
const excludeAttributes = [
    'createdAt',
    'updatedAt',
    'password',
];

class UserRepository {
    static async create(user, options) {
        let response = null;

        try {
            response = UserEntity.build(user);

            response = await response.save({
                transaction: options ? options.transaction : null,
                returning: true,
            });
        } catch (err) {
            return null;
        }
        return response;
    }

    static async selectOne(options) {
        let response = null;

        try {
            options = {
                ...options,
                attributes: {
                    exclude: excludeAttributes,
                },
            };
            response = await UserEntity.findOne(options);
        } catch (err) {
            return null;
        }
        return response;
    }

    static async selectOnePrivate(options) {
        let response = null;

        try {
            options = {
                ...options,
            };

            response = await UserEntity.findOne(options);
        } catch (err) {
            return null;
        }

        return response;
    }

    static async selectAll(options) {
        let response = null;
        
        try {
            options = {
                ...options,
                attributes: {
                    exclude: excludeAttributes,
                },
            };
        
            response = await UserEntity.findAll(options);
        } catch (err) {
            return null;
        }
        return response;
    }

  static async selectWithPagination(options) {
    let response = null;

    try {
      options = {
        ...options,
        attributes: {
          exclude: excludeAttributes,
        },
      };
      response = await UserEntity.findAndCountAll(options);
    } catch (err) {
      return null;
    }

    return response;
  }

  static async updateById(id, user, options) {
    let response = null;

    try {
      response = await UserEntity.update(user, {
        where: { id },
        transaction: options && options.transaction,
        returning: true,
      });

      [, [response]] = response;
    } catch (err) {
      return null;
    }

    return response;
  }
}

module.exports = UserRepository;