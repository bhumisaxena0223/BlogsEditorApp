import GenericDB from './generic-db'

export default class UserBlogsDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/blogs`)
  }

  // Here you can extend UserProductsDB with custom methods
}
