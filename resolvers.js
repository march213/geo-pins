const user = {
  _id: '1',
  name: 'Jane',
  email: 'c@c.com',
  picture: 'url...',
};

module.exports = {
  Query: {
    me: () => user,
  },
};
